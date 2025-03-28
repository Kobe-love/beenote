<template>
  <div class="users-container">
    <div class="header">
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>新建用户
      </el-button>
    </div>

    <el-table 
      :data="users" 
      v-loading="loading"
      stripe
    >
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="first_name" label="姓名">
        <template #default="{ row }">
          {{ row.first_name }} {{ row.last_name }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="last_name" label="名" /> -->
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          <el-tag :type="getRoleTagType(row.role)">{{ getRoleLabel(row.role) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_active" label="状态" width="100">
        <template #default="{ row }">
          <el-switch
            v-model="row.is_active"
            :loading="row.statusLoading"
            @change="handleStatusChange(row)"
            :active-text="row.is_active ? '启用' : '禁用'"
            :disabled="row.username === userStore.user?.username"
            inline-prompt
          />
        </template>
      </el-table-column>
      <el-table-column prop="last_active_at" label="最后活跃时间">
        <template #default="{ row }">
          {{ formatDateTime(row.last_active_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="date_joined" label="加入时间">
        <template #default="{ row }">
          {{ formatDateTime(row.date_joined) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" :width="showAuthButton ? 280 : 200" fixed="right">
        <template #default="{ row }">
          <el-button-group>
            <el-button 
              type="primary" 
              :icon="Edit"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button 
              v-if="showAuthButton"
              type="success" 
              :icon="Key"
              @click="handleAuth(row)"
            >
              授权
            </el-button>
            <el-button 
              type="danger" 
              :icon="Delete"
              :disabled="row.username === userStore.user?.username"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="currentUser ? '编辑用户' : '新建用户'"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item 
          label="密码" 
          prop="password"
          :rules="[
            { required: !currentUser, message: '请输入密码' }
          ]"
        >
          <el-input 
            v-model="form.password" 
            type="password"
            :disabled="currentUser?.username === userStore.user?.username"
            :placeholder="currentUser?.username === userStore.user?.username ? 
              '不能修改自己的密码' : 
              (currentUser ? '不修改请留空' : '请输入密码')"
          />
        </el-form-item>
        <el-form-item label="姓" prop="first_name">
          <el-input v-model="form.first_name" />
        </el-form-item>
        <el-form-item label="名" prop="last_name">
          <el-input v-model="form.last_name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role">
            <el-option label="超级管理员" value="superuser" />
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="is_active">
          <el-switch v-model="form.is_active" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit(formRef)" :loading="submitting">
          确定
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="authDialogVisible"
      :title="`${currentUser?.name || ''} 的授权管理`"
      width="800px"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane label="笔记授权" name="notes">
          <el-table
            :data="notes"
            v-loading="notesLoading"
            style="width: 100%"
          >
            <el-table-column prop="title" label="笔记名称" />
            <el-table-column prop="group_detail.name" label="所属分组" />
            <el-table-column label="授权" width="100" align="center">
              <template #default="{ row }">
                <el-switch
                  v-model="row.hasAuth"
                  @change="handleNoteAuthChange(row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="分组授权" name="groups">
          <el-table
            :data="groups"
            v-loading="groupsLoading"
            style="width: 100%"
          >
            <el-table-column prop="name" label="分组名称" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="授权" width="100" align="center">
              <template #default="{ row }">
                <el-switch
                  v-model="row.hasAuth"
                  @change="handleGroupAuthChange(row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { Plus, Edit, Delete, Key } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { getUsers, createUser, updateUser, deleteUser, getNotes, getGroups } from '@/api'
import type { User } from '@/api/types'
import { useUserStore } from '@/store/user'

const users = ref<User[]>([])
const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const currentUser = ref<User | null>(null)
const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  email: '',
  role: 'user',
  is_active: true
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码长度至少为6位，并同时包含大小写字母和数字'))
        } else if (!/[A-Z]/.test(value)) {
          callback(new Error('密码长度至少为6位，并同时包含大小写字母和数字'))
        } else if (!/[a-z]/.test(value)) {
          callback(new Error('密码长度至少为6位，并同时包含大小写字母和数字'))
        } else if (!/\d/.test(value)) {
          callback(new Error('密码长度至少为6位，并同时包含大小写字母和数字'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
}

const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await getUsers()
    users.value = res.data.map(user => ({
      ...user,
      statusLoading: false
    }))
  } catch (error) {
    console.error(error)
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  form.username = ''
  form.password = ''
  form.first_name = ''
  form.last_name = ''
  form.email = ''
  form.role = 'user'
  form.is_active = true
  currentUser.value = null
}

const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新建用户'
  form.value = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    role: 'user',
    is_active: true
  }
}

const handleEdit = (user: User) => {
  currentUser.value = user
  Object.assign(form, {
    username: user.username,
    password: '',
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    is_active: user.is_active
  })
  dialogVisible.value = true
}

const handleSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      dialogVisible.value = false
      const promise = currentUser.value
        ? updateUser(currentUser.value.id, form)
        : createUser(form)
      promise
        .then(() => {
          ElMessage.success('保存成功')
          dialogVisible.value = false
          fetchUsers()
        })
        .catch(err => {
          ElMessage.error(err.message || '保存失败')
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}

const handleDelete = async (user: User) => {
  if (user.username === userStore.user?.username) {
    ElMessage.warning('不能删除自己的账号')
    return
  }

  try {
    await ElMessageBox.confirm(
      '确定要删除该用户吗？此操作不可恢复',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    await deleteUser(user.id)
    ElMessage.success('删除成功')
    await fetchUsers()
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
      ElMessage.error('删除失败')
    }
  }
}

// 格式化日期时间
const formatDateTime = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-')
}

// 处理状态切换
const handleStatusChange = async (user: User & { statusLoading?: boolean }) => {
  // 禁止用户禁用自己的账号
  if (user.username === userStore.user?.username && !user.is_active) {
    ElMessage.warning('不能禁用自己的账号')
    user.is_active = true
    return
  }

  user.statusLoading = true
  try {
    await updateUser(user.id, { is_active: user.is_active })
    ElMessage.success(`已${user.is_active ? '启用' : '禁用'}用户`)
  } catch (error) {
    console.error(error)
    ElMessage.error('更新状态失败')
    // 恢复原状态
    user.is_active = !user.is_active
  } finally {
    user.statusLoading = false
  }
}

// 授权相关
const authDialogVisible = ref(false)
const activeTab = ref('notes')
const notes = ref([])
const groups = ref([])
const notesLoading = ref(false)
const groupsLoading = ref(false)

const handleAuth = async (user: User) => {
  currentUser.value = user
  authDialogVisible.value = true
  await Promise.all([fetchNotes(), fetchGroups()])
}

const fetchNotes = async () => {
  if (!currentUser.value) return
  notesLoading.value = true
  try {
    const res = await getNotes()
    notes.value = res.data.results.map(note => ({
      ...note,
      hasAuth: currentUser.value.notes?.includes(note.id)
    }))
  } catch (error) {
    console.error(error)
    ElMessage.error('获取笔记列表失败')
  } finally {
    notesLoading.value = false
  }
}

const fetchGroups = async () => {
  if (!currentUser.value) return
  groupsLoading.value = true
  try {
    const res = await getGroups()
    groups.value = res.data.map(group => ({
      ...group,
      hasAuth: currentUser.value.note_group?.includes(group.id)
    }))
  } catch (error) {
    console.error(error)
    ElMessage.error('获取分组列表失败')
  } finally {
    groupsLoading.value = false
  }
}

const handleNoteAuthChange = async (note: any) => {
  if (!currentUser.value) return
  try {
    const noteIds = note.hasAuth
      ? [...(currentUser.value.notes || []), note.id]
      : (currentUser.value.notes || []).filter(id => id !== note.id)

    await updateUser(currentUser.value.id, {
      note: noteIds,
      note_group: currentUser.value.note_group || []  // 保持分组授权不变
    })
    
    currentUser.value.notes = noteIds
    ElMessage.success('笔记授权更新成功')
  } catch (error: any) {
    console.error(error)
    ElMessage.error(error.response?.data?.detail || '笔记授权更新失败')
    note.hasAuth = !note.hasAuth
  }
}

const handleGroupAuthChange = async (group: any) => {
  if (!currentUser.value) return
  try {
    const groupIds = group.hasAuth
      ? [...(currentUser.value.note_group || []), group.id]
      : (currentUser.value.note_group || []).filter(id => id !== group.id)

    await updateUser(currentUser.value.id, {
      note: currentUser.value.notes || [],  // 保持笔记授权不变
      note_group: groupIds
    })
    
    currentUser.value.note_group = groupIds
    ElMessage.success('分组授权更新成功')
  } catch (error: any) {
    console.error(error)
    ElMessage.error(error.response?.data?.detail || '分组授权更新失败')
    group.hasAuth = !group.hasAuth
  }
}

const userStore = useUserStore()

const showAuthButton = computed(() => userStore.user?.role === 'admin' || userStore.user?.role === 'superuser')

const getRoleLabel = (role: string) => {
  const roleMap: { [key: string]: string } = {
    'superuser': '超级管理员',
    'admin': '管理员',
    'user': '普通用户'
  }
  return roleMap[role] || role
}

const getRoleTagType = (role: string) => {
  const typeMap: { [key: string]: '' | 'success' | 'warning' | 'danger' } = {
    'superuser': 'danger',
    'admin': 'warning',
    'user': 'success'
  }
  return typeMap[role] || ''
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.users-container {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

:deep(.el-switch) {
  --el-switch-on-color: var(--el-color-success);
}

.el-tabs {
  margin: -20px;
}

.el-tab-pane {
  padding: 20px;
}
</style> 