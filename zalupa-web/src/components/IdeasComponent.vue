<script setup>
import { API } from '../../services/api'
import { ref, onMounted } from 'vue'
import { instance } from '../../services/axios/instance'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Данные формы
const ideaForm = ref({
  title: '',
  description: '',
  category: '',
  telegramLink: ''
})

const categories = ref([
  'Новый функционал',
  'Улучшение дизайна', 
  'Исправление ошибок',
  'Оптимизация',
  'Другое'
])

const isSubmitting = ref(false)
const submitStatus = ref('')

// Загрузка идей при монтировании
onMounted(async () => {
  await loadIdeas()
})

async function loadIdeas() {
  try {
    const response = await instance.get('/ideas')
    authStore.ideaList = response.data.data
  } catch (error) {
    console.error('Ошибка загрузки идей:', error)
  }
}

// Отправка идеи
async function submitIdea(event) {
  event.preventDefault()
  
  if (!ideaForm.value.title || !ideaForm.value.description) {
    submitStatus.value = 'Заполните обязательные поля'
    return
  }
  
  isSubmitting.value = true
  submitStatus.value = ''

  try {
    const response = await instance.post('/ideas', {
      data: {
        title: ideaForm.value.title,
        description: ideaForm.value.description,
        category: ideaForm.value.category,
        sender: authStore.user?.username || 'guest',
        agreement_status: 0,
        telegram_link: telegramLink,
        send_date: new Date().toISOString()
      }
    })

    if (response.data) {
      submitStatus.value = 'success'
      ideaForm.value = { title: '', description: '', category: '', telegramLink: ''}
      
      // Обновляем список идей
      await loadIdeas()
      
      setTimeout(() => {
        submitStatus.value = ''
      }, 3000)
    }
  } catch (error) {
    console.error('Ошибка отправки идеи:', error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

// Сброс формы
function resetForm() {
  ideaForm.value = { title: '', description: '', category: '', telegramLink: ''}
  submitStatus.value = ''
}
</script>

<template>
  <div class="ideas-container">
    <!-- Форма отправки идеи -->
    <div class="idea-form-section">
      <h2 class="section-title">Предложить идею</h2>
      
      <form @submit="submitIdea" class="idea-form">
        <div class="form-group">
          <label for="idea-title">Заголовок идеи *</label>
          <input
            id="idea-title"
            v-model="ideaForm.title"
            type="text"
            placeholder="Краткое описание идеи"
            maxlength="100"
            required
          >
        </div>

        <div class="form-group">
          <label for="idea-description">Подробное описание *</label>
          <textarea
            id="idea-description"
            v-model="ideaForm.description"
            placeholder="Опишите вашу идею подробнее..."
            rows="5"
            maxlength="500"
            required
          ></textarea>
          <span class="char-count">{{ ideaForm.description.length }}/500</span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="idea-category">Категория</label>
            <select id="idea-category" v-model="ideaForm.category">
              <option value="">Выберите категорию</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>

        <!-- Статус отправки -->
        <div v-if="submitStatus" class="status-message" :class="submitStatus">
          <span v-if="submitStatus === 'success'">✅ Идея успешно отправлена!</span>
          <span v-else-if="submitStatus === 'error'">❌ Ошибка при отправке</span>
          <span v-else>{{ submitStatus }}</span>
        </div>

        <div class="form-actions">

        <div class="form-group">
          <label for="telegram-link-title">ТГ для связи</label>
          <input
            id="telegram-link-title"
            v-model="ideaForm.telegramLink"
            type="text"
            placeholder="@Username"
            maxlength="50"
            required
          >
        </div>

        <div class="clear-send-buttons">
          <button 
            type="button" 
            @click="resetForm" 
            class="cancel-btn"
            :disabled="isSubmitting"
          >
            Очистить
          </button>
          <button 
            type="submit" 
            class="submit-btn"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Отправка...' : 'Отправить идею' }}
          </button>
        </div>

        </div>
      </form>
    </div>

    <!-- Список отправленных идей -->
    <div class="ideas-list-section">
      <h2 class="section-title">Мои идеи</h2>
      
      <div v-if="authStore.ideaList && authStore.ideaList.length === 0" class="empty-state">
        <p>Вы еще не отправляли идеи</p>
      </div>

      <div v-else class="ideas-grid">
        <div 
          v-for="idea in authStore.ideaList" 
          :key="idea.id" 
          class="idea-card"
        >
          <div class="idea-header">
            <h3 class="idea-title">{{ idea.title }}</h3>
            <span class="idea-status" :class="idea.agreement_status">
              {{ idea.agreement_status === '0' ? 'На рассмотрении' : 
                 idea.agreement_status === '1' ? 'Принято' : 'Отклонено' }}
            </span>
          </div>

          <p class="idea-description">{{ idea.description }}</p>

          <div class="idea-meta">
            <span class="idea-category">{{ idea.category }}</span>
            <span class="idea-date">{{ new Date(idea.createdAt).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.clear-send-buttons {
    display: flex;
    gap: 15px;
}
.telegram-link {
    display: flex;
}

.ideas-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: 'PPmori-Regular', sans-serif;
  font-size: 28px;
  color: white;
  margin-bottom: 30px;
  text-align: center;
}

/* Форма */
.idea-form {
  background: #1C1C1C;
  padding: 30px;
  border-radius: 15px;
  border: 2px solid #6F6F6F;
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-family: 'PPmori-Regular', sans-serif;
  color: white;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px 15px;
  background: #2C2C2C;
  border: 2px solid #6F6F6F;
  border-radius: 8px;
  color: white;
  font-family: 'PPmori-Regular', sans-serif;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-row {
  display: grid;
  gap: 20px;
}

.char-count {
  display: block;
  text-align: right;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

/* Кнопки */
.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 25px;
  align-items: center;
  justify-content: space-between;
}

.submit-btn,
.cancel-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-family: 'PPmori-Regular', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn {
  background: #6441a5;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #7a52d1;
}

.cancel-btn {
  background: #6F6F6F;
  color: white;
}

.cancel-btn:hover:not(:disabled) {
  background: #8F8F8F;
}

.submit-btn:disabled,
.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Статус */
.status-message {
  padding: 12px;
  border-radius: 8px;
  margin: 15px 0;
  text-align: center;
  font-family: 'PPmori-Regular', sans-serif;
}

.status-message.success {
  background: #ACFF9E;
  color: #2d5016;
}

.status-message.error {
  background: #FF695B;
  color: #fff;
}

/* Список идей */
.ideas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.idea-card {
  background: #1C1C1C;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #6F6F6F;
  transition: transform 0.3s ease;
  height: max-content;
text-wrap: wrap;
}

.idea-card:hover {
  transform: translateY(-5px);
  border-color: #6441a5;
}

.idea-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.idea-title {
  font-family: 'PPmori-Regular', sans-serif;
  color: white;
  font-size: 18px;
  margin: 0;
  flex: 1;
}

.idea-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.idea-status.pending {
  background: #FFD28F;
  color: #000;
}

.idea-status.approved {
  background: #ACFF9E;
  color: #000;
}

.idea-status.rejected {
  background: #FF695B;
  color: #fff;
}

.idea-description {
  color: #CCC;
  font-family: 'PPmori-Regular', sans-serif;
  line-height: 1.5;
  margin-bottom: 15px;
}

.idea-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
  color: #888;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
  font-family: 'PPmori-Regular', sans-serif;
}

/* Адаптивность */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .ideas-grid {
    grid-template-columns: 1fr;
  }
  
  .idea-header {
    flex-direction: column;
    gap: 10px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .submit-btn,
  .cancel-btn {
    width: 100%;
  }
}
</style>

<style>
/* Глобальные стили для шрифта */
@font-face {
  font-family: 'PPmori-Regular';
  src: url('C:\Users\Admin\Documents\GitHub\ZALUPAWEB\zalupa-web\src\fonts\PPMori-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: 'PPmori-Regular', sans-serif;
}
</style>