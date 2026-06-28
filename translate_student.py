import re

files_to_translate = ['src/pages/UserPage.tsx', 'src/pages/DashboardPage.tsx', 'src/pages/CreateReportPage.tsx']

translations = {
    "Report an Issue": "Повідомити про проблему",
    "Community Board": "Дошка оголошень",
    "Complaint Details": "Деталі Заявки",
    "SUBMITTED": "ПОДАНО",
    "IN PROGRESS": "В ПРОЦЕСІ",
    "RESOLVED": "ВИРІШЕНО",
    "PENDING": "В ОЧІКУВАННІ",
    "Comments": "Коментарі",
    "No Announcements": "Немає оголошень",
    "Confirm Deletion": "Підтвердити Видалення",
    "Admin": "Адмін",
    "My Complaints": "Мої Заявки",
    "Date Submitted": "Дата Подання",
    "Are you sure you want to permanently delete this complaint? This action cannot be undone.": "Ви впевнені, що хочете видалити цю заявку назавжди? Цю дію неможливо скасувати.",
    "Are you sure you want to permanently delete this comment? This action cannot be undone.": "Ви впевнені, що хочете видалити цей коментар назавжди? Цю дію неможливо скасувати.",
    "Description": "Опис",
    "Location": "Розташування",
    "Add a comment...": "Додати коментар...",
    "Category": "Категорія",
    "Priority": "Пріоритет",
    "Submit Report": "Подати Звіт",
    "Create New Report": "Створити Нову Заявку",
    "Upload a clear photo of the issue": "Завантажте чітке фото проблеми",
    "Provide additional details...": "Надайте додаткові деталі...",
    "Back": "Назад",
    ">Delete<": ">Видалити<",
    ">Cancel<": ">Скасувати<",
    ">Send<": ">Надіслати<",
    ">Save<": ">Зберегти<",
}

for file_path in files_to_translate:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        for eng, ukr in translations.items():
            content = content.replace(eng, ukr)
            
        content = re.sub(r'>\s*Delete\s*</button>', '>\n                Видалити\n              </button>', content)
        content = re.sub(r'>\s*Cancel\s*</button>', '>\n                Скасувати\n              </button>', content)
        content = re.sub(r'>\s*Send\s*</button>', '>\n                Надіслати\n              </button>', content)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except FileNotFoundError:
        pass

import re

files_to_translate = ['src/pages/UserPage.tsx', 'src/pages/DashboardPage.tsx']

for file_path in files_to_translate:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        content = content.replace("fetchMyПроблемаs", "fetchMyProblems")
        content = content.replace("deleteПроблема", "deleteProblem")
        content = content.replace("myПроблемаs", "myProblems")
        content = content.replace("setMyПроблемаs", "setMyProblems")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except FileNotFoundError:
        pass
import re

file_path = 'src/pages/UserPage.tsx'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    translations = {
        'Hello, {currentUser?.first_name || "User"}!': 'Привіт, {currentUser?.first_name || "Гість"}!',
        'NO LOCATION SPECIFIED': 'ЛОКАЦІЮ НЕ ВКАЗАНО',
        'Submit a new maintenance ticket for your room or common areas.': 'Створіть нову заявку на ремонт для вашої кімнати або місць загального користування.',
        'View Active Feed': 'Переглянути Стрічку',
        '{p.title || "Без назви Issue"}': '{p.title || "Без назви"}',
        'Your board is clear. We\'ll post scheduled maintenance or building updates here.': 'Ваша дошка порожня. Тут ми будемо публікувати заплановані технічні роботи або новини гуртожитку.',
        'No comments yet.': 'Ще немає коментарів.',
        'Delete Comment': 'Видалити Коментар',
        '>Send<': '>Надіслати<',
        'Loading...': 'Завантаження...',
        "{p.priority}": "{p.priority === 'critical' ? 'КРИТИЧНИЙ' : p.priority === 'high' ? 'ВИСОКИЙ' : p.priority === 'low' ? 'НИЗЬКИЙ' : 'СЕРЕДНІЙ'}"
    }

    for eng, ukr in translations.items():
        content = content.replace(eng, ukr)
        
    # Replace en-US date formatting with uk-UA
    content = content.replace("'en-US'", "'uk-UA'")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
except FileNotFoundError:
    pass
import re

files_to_translate = ['src/pages/UserPage.tsx', 'src/pages/DashboardPage.tsx']

translations = {
    '"Send"': '"Надіслати"',
    'Submitted on:': 'Подано:',
    'View all reported issues': 'Переглянути всі заявки',
    'Return to Profile': 'Повернутися до профілю',
    "'en-US'": "'uk-UA'",
    '"Без назви Issue"': '"Без назви"',
    '"..."': '"..."' # dummy
}

for file_path in files_to_translate:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        for eng, ukr in translations.items():
            content = content.replace(eng, ukr)
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except FileNotFoundError:
        pass
import re

files_to_translate = ['src/pages/UserPage.tsx', 'src/pages/DashboardPage.tsx', 'src/pages/AdminPage.tsx']

for file_path in files_to_translate:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix getPriorityBadge
        content = content.replace("getПріоритетBadge", "getPriorityBadge")
        
        # In getPriorityBadge, priority is output directly as {priority} or {priority.toUpperCase()} maybe?
        # Let's replace the whole return statement of getPriorityBadge.
        # Actually it's easier to just do text replacement.
        content = content.replace("{priority}", "{priority === 'critical' ? 'КРИТИЧНИЙ' : priority === 'high' ? 'ВИСОКИЙ' : priority === 'low' ? 'НИЗЬКИЙ' : 'СЕРЕДНІЙ'}")
        
        # Fix REJECTED in getStatusBadge
        content = content.replace("'REJECTED'", "'ВІДХИЛЕНО'")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except FileNotFoundError:
        pass
import re

files_to_translate = ['src/pages/UserPage.tsx', 'src/pages/DashboardPage.tsx']

translations = {
    "Complaint Details": "Деталі Заявки",
    "Active Complaints": "Активні Заявки",
    "No complaints found.": "Заявок не знайдено.",
    "Untitled": "Без назви",
    "OTHER": "ІНШЕ",
    "Building": "Гуртожиток",
    "Full size": "Повний розмір",
    "Problem Zoomed": "Збільшене фото проблеми",
    "Problem": "Проблема",
    "Delete Complaint": "Видалити Заявку",
    "Admin Panel": "Панель Адміністратора",
}

for file_path in files_to_translate:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        for eng, ukr in translations.items():
            content = content.replace(eng, ukr)
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except FileNotFoundError:
        pass

# Also fix StudentLayout.tsx
try:
    with open('src/components/StudentLayout.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("Admin Panel", "Панель Адміністратора")
    with open('src/components/StudentLayout.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
except FileNotFoundError:
    pass
