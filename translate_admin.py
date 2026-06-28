import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    '"Overview"': '"Огляд"',
    '"Complaints"': '"Заявки"',
    '"Tickets"': '"Задачі"',
    '"Admin Dashboard"': '"Панель Адміністратора"',
    '"Logout"': '"Вийти"',
    '"Pending Complaints"': '"Нові Заявки"',
    '"In Progress"': '"В Процесі"',
    '"Resolved"': '"Вирішено"',
    '"Search complaints..."': '"Пошук заявок..."',
    '"All Statuses"': '"Всі Статуси"',
    '"Pending"': '"В очікуванні"',
    '"Approved"': '"Опубліковано"',
    '"Rejected"': '"Відхилено"',
    '"All Categories"': '"Всі Категорії"',
    '"All Priorities"': '"Всі Пріоритети"',
    '"Low"': '"Низький"',
    '"Medium"': '"Середній"',
    '"High"': '"Високий"',
    '"Critical"': '"Критичний"',
    '"All Buildings"': '"Всі Гуртожитки"',
    '"Clear Filters"': '"Очистити Фільтри"',
    '"Create Ticket"': '"Створити Задачу"',
    '"Search tickets..."': '"Пошук задач..."',
    '"All Workers"': '"Всі Працівники"',
    '"All tickets"': '"Всі задачі"',
    '"Not created"': '"Не створені"',
    '"Created"': '"Створені"',
    '"Edit Ticket"': '"Редагувати Задачу"',
    '"Assign Ticket"': '"Призначити Задачу"',
    '"Cancel"': '"Скасувати"',
    '"Save"': '"Зберегти"',
    '"Assign Worker"': '"Призначити Працівника"',
    '"-- Select Employee --"': '"-- Оберіть Працівника --"',
    '"Completion Deadline"': '"Дедлайн"',
    '"Complaint Details"': '"Деталі Заявки"',
    '"Update Priority"': '"Змінити Пріоритет"',
    '"Comments"': '"Коментарі"',
    '"Loading..."': '"Завантаження..."',
    '"No comments yet."': '"Ще немає коментарів."',
    '"Admin"': '"Адмін"',
    '"Delete Comment"': '"Видалити Коментар"',
    '"Add a comment as Admin..."': '"Додати коментар..."',
    '"Send"': '"Надіслати"',
    '"Publish"': '"Опублікувати"',
    '"Reject"': '"Відхилити"',
    '"Mark Resolved"': '"Вирішено"',
    '"Delete"': '"Видалити"',
    '"Confirm Status Change"': '"Підтвердити Зміну Статусу"',
    '"Are you sure you want to change the status of this complaint to "': '"Ви впевнені, що хочете змінити статус заявки на "',
    '"Confirm"': '"Підтвердити"',
    '"Confirm Deletion"': '"Підтвердити Видалення"',
    '"Are you sure you want to permanently delete this complaint? This action cannot be undone."': '"Ви впевнені, що хочете назавжди видалити цю заявку? Ця дія незворотна."',
    '"Are you sure you want to delete this comment?"': '"Ви впевнені, що хочете видалити цей коментар?"',
    '"Failed to update status"': '"Не вдалося оновити статус"',
    '"Failed to delete complaint"': '"Не вдалося видалити заявку"',
    '"Failed to update priority"': '"Не вдалося оновити пріоритет"',
    '"Failed to post comment"': '"Не вдалося додати коментар"',
    '"Failed to delete comment"': '"Не вдалося видалити коментар"',
    '"Failed to save ticket"': '"Не вдалося зберегти задачу"',
    'alert("Failed': 'alert("Не вдалося',
    '"Building "': '"Гуртожиток "',
    '">Overview<': '">Огляд<',
    '">Complaints<': '">Заявки<',
    '">Tickets<': '">Задачі<',
    '">Pending Complaints<': '">Нові Заявки<',
    '">In Progress<': '">В Процесі<',
    '">Resolved<': '">Вирішено<',
    '">Building ': '">Гуртожиток ',
    'title="Edit Ticket"': 'title="Редагувати Задачу"',
    'title="Create Ticket"': 'title="Створити Задачу"',
    'title="Delete Comment"': 'title="Видалити Коментар"',
    '"Filter by date from"': '"Фільтр від дати"',
    '"Filter by date to"': '"Фільтр до дати"',
    '"Total Tickets:"': '"Всього Задач:"',
    '"No tickets found."': '"Задачі не знайдені."',
    '"No complaints found."': '"Заявки не знайдені."',
    '"Download Data"': '"Завантажити Дані"',
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    'Facility Overview': 'Загальний Огляд',
    'All Complaints': 'Всі Заявки',
    'Ticket Management': 'Управління Задачами',
    'View all': 'Всі',
    'IN PROGRESS': 'В ПРОЦЕСІ',
    'name: "All"': 'name: "Всі"',
    'name: "Published"': 'name: "Опубліковано"',
    '>ALL<': '>ВСІ<',
    'name: "All Tickets"': 'name: "Всі Задачі"',
    'Complaint must be published to create ticket': 'Для створення задачі заявка має бути опублікована',
    'Assign Ticket': 'Призначити Задачу',
    'Edit Ticket': 'Редагувати Задачу',
    'PUBLISHED': 'ОПУБЛІКОВАНО',
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    '"Facility Overview"': '"Загальний Огляд"',
    '"All Complaints"': '"Всі Заявки"',
    '"Ticket Management"': '"Управління Задачами"',
    '"View all"': '"Всі"',
    '"IN PROGRESS"': '"В ПРОЦЕСІ"',
    'name: "All"': 'name: "Всі"',
    'name: "Published"': 'name: "Опубліковано"',
    '>ALL<': '>ВСІ<',
    'name: "All Tickets"': 'name: "Всі Задачі"',
    'Complaint must be published to create ticket': 'Для створення задачі заявка має бути опублікована',
    'Assign Ticket': 'Призначити Задачу',
    'Edit Ticket': 'Редагувати Задачу',
    'PUBLISHED': 'ОПУБЛІКОВАНО',
    '"Ticket Filters"': '"Фільтри Задач"',
    '"Ticket Status"': '"Статус Задачі"',
    '"Clear"': '"Очистити"',
    '"No complaints to ticket."': '"Немає заявок для задач."',
    '"Assigned Ticket #"': '"Призначено Задачу #"',
    '"Worker: "': '"Працівник: "',
    '"Deadline: "': '"Дедлайн: "',
    '"Create Ticket"': '"Створити Задачу"',
    '"Edit Ticket"': '"Редагувати Задачу"',
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    ">Export Data<": ">Експорт Даних<",
    ">New Work Order<": ">Новий Тікет<",
    "Worker: ": "Працівник: ",
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    "Export Data": "ЕКСПОРТ ДАНИХ",
    "New Work Order": "НОВИЙ ТІКЕТ",
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    ">Delete<": ">Видалити<",
    ">Cancel<": ">Скасувати<",
    "Delete Complaint": "Видалити Заявку",
    "Are you sure you want to permanently delete this complaint? This action cannot be undone.": "Ви впевнені, що хочете видалити цю заявку назавжди? Цю дію неможливо скасувати.",
    "Delete Comment": "Видалити Коментар",
    "Are you sure you want to permanently delete this comment? This action cannot be undone.": "Ви впевнені, що хочете видалити цей коментар назавжди? Цю дію неможливо скасувати.",
    ">Ticket Status<": ">Статус Тікета<",
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'>\s*Delete\s*</button>', '>\n                Видалити\n              </button>', content)
content = re.sub(r'>\s*Cancel\s*</button>', '>\n                Скасувати\n              </button>', content)

translations = {
    "Confirm Deletion": "Підтвердити Видалення",
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    "'Редагувати Задачу'": "'Редагувати Тікет'",
    "'Призначити Задачу'": "'Призначити Тікет'",
    ">Status<": ">Статус<",
    ">Category<": ">Категорія<",
    ">Priority<": ">Пріоритет<",
    ">Building<": ">Гуртожиток<",
    ">Worker<": ">Працівник<",
    ">Filters<": ">Фільтри<",
    ">Clear Filters<": ">Очистити Фільтри<",
    ">Search<": ">Пошук<",
    ">Overview<": ">Огляд<",
    ">Complaints<": ">Заявки<",
    ">Tickets<": ">Тікети<",
    ">Clear<": ">Очистити<",
    ">Total Complaints<": ">Всього Заявок<",
    ">Total Tickets<": ">Всього Тікетів<",
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/components/AdminLayout.tsx', 'r', encoding='utf-8') as f:
    layout = f.read()

layout_translations = {
    "Задачі": "Тікети",
    "Задач": "Тікетів",
}

for eng, ukr in layout_translations.items():
    layout = layout.replace(eng, ukr)

with open('src/components/AdminLayout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    admin_content = f.read()

admin_translations = {
    ">Date From<": ">Дата Від<",
    ">Date To<": ">Дата До<",
}

for eng, ukr in admin_translations.items():
    admin_content = admin_content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(admin_content)


with open('src/components/ProfileModal.tsx', 'r', encoding='utf-8') as f:
    profile_content = f.read()

profile_translations = {
    ">Profile<": ">Профіль<",
}

for eng, ukr in profile_translations.items():
    profile_content = profile_content.replace(eng, ukr)

with open('src/components/ProfileModal.tsx', 'w', encoding='utf-8') as f:
    f.write(profile_content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    # Replace tasks to tickets
    '"Задачі"': '"Тікети"',
    '>Задачі<': '>Тікети<',
    '"Всі Задачі"': '"Всі Тікети"',
    '"Управління Задачами"': '"Управління Тікетами"',
    '"Створити Задачу"': '"Створити Тікет"',
    '"Редагувати Задачу"': '"Редагувати Тікет"',
    '"Призначити Задачу"': '"Призначити Тікет"',
    '"Фільтри Задач"': '"Фільтри Тікетів"',
    '"Статус Задачі"': '"Статус Тікета"',
    '"Задачі не знайдені."': '"Тікети не знайдені."',
    '"Немає заявок для задач."': '"Немає заявок для тікетів."',
    '"Призначено Задачу #"': '"Призначено Тікет #"',
    '"Всього Задач:"': '"Всього Тікетів:"',
    '"Пошук задач..."': '"Пошук тікетів..."',

    # Filters and text not translated yet
    '>Status<': '>Статус<',
    '>Category<': '>Категорія<',
    '>Priority<': '>Пріоритет<',
    '>Building<': '>Гуртожиток<',
    '>Worker<': '>Працівник<',
    '>Filters<': '>Фільтри<',
    '>Clear Filters<': '>Очистити Фільтри<',
    '>Search<': '>Пошук<',
    
    # Overview cards
    '>Total Complaints<': '>Всього Заявок<',
    '>Total Tickets<': '>Всього Тікетів<',
    '>In Progress<': '>В Процесі<',
    '>Resolved<': '>Вирішено<',

    # Complaint details
    '>Submitted on:<': '>Подано:<',
    '>Assign Worker<': '>Призначити Працівника<',
    '>Completion Deadline<': '>Дедлайн<',
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/components/AdminLayout.tsx', 'r', encoding='utf-8') as f:
    layout = f.read()

layout = layout.replace('"Управління Задачами"', '"Управління Тікетами"')
layout = layout.replace('Задачі', 'Тікети')
layout = layout.replace('Задач', 'Тікетів')

with open('src/components/AdminLayout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    "RESOLVED": "ВИРІШЕНО",
    "REJECTED": "ВІДХИЛЕНО",
    ">Publish<": ">Опублікувати<",
    ">Reject<": ">Відхилити<",
    ">Resolve<": ">Вирішити<",
    "Confirm Status Change": "Підтвердити Зміну Статусу",
    "Are you sure you want to change the status of this complaint to ": "Ви впевнені, що хочете змінити статус цієї заявки на ",
    "Building ": "Гуртожиток ",
    "OTHER": "ІНШЕ",
    "Mark Resolved": "Вирішити",
    "Ticket Status": "Статус Тікета",
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    ">Recent Complaints<": ">Останні Заявки<",
    ">Issue<": ">Проблема<",
    ">Date Submitted<": ">Дата Подання<",
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    '>Pending<': '>В Очікуванні<',
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
import re

# Fix AdminPage.tsx
with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    admin_content = f.read()

admin_translations = {
    "Assigned Ticket #": "Призначено Тікет #",
    "Deadline:": "Дедлайн:",
}

for eng, ukr in admin_translations.items():
    admin_content = admin_content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(admin_content)


# Fix ProfileModal.tsx
with open('src/components/ProfileModal.tsx', 'r', encoding='utf-8') as f:
    profile_content = f.read()

profile_translations = {
    '"Admin"': '"Адмін"',
    '"Student"': '"Студент"',
    ">Building<": ">Гуртожиток<",
    ">Room<": ">Кімната<",
    "Log out": "Вийти",
    "Edit Profile": "Редагувати Профіль",
    "New Photo": "Нове Фото",
    "First Name": "Ім'я",
    "Last Name": "Прізвище",
    ">Location<": ">Розташування<",
    ">Floor<": ">Поверх<",
    ">Save<": ">Зберегти<",
    ">Cancel<": ">Скасувати<",
    "Emergency Contacts": "Екстрені Контакти",
    ">Manager<": ">Комендант<",
}

for eng, ukr in profile_translations.items():
    profile_content = profile_content.replace(eng, ukr)

# Handle cases that are not inside angle brackets explicitly if needed
profile_content = re.sub(r'>\s*Log out\s*</button>', '>\n                      Вийти\n                    </button>', profile_content)
profile_content = re.sub(r'>\s*Save\s*</button>', '>\n                      Зберегти\n                    </button>', profile_content)
profile_content = re.sub(r'>\s*Cancel\s*</button>', '>\n                      Скасувати\n                    </button>', profile_content)

with open('src/components/ProfileModal.tsx', 'w', encoding='utf-8') as f:
    f.write(profile_content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

translations = {
    '>Pending<': '>В очікуванні<',
    'PENDING': 'В ОЧІКУВАННІ',
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/components/AdminLayout.tsx', 'r', encoding='utf-8') as f:
    layout_content = f.read()

layout_translations = {
    '"Admin Overview"': '"Загальний Огляд"',
    '"Residents"': '"Мешканці"',
    '"All Complaints"': '"Всі Заявки"',
    '"Announcements"': '"Оголошення"',
    '"Settings"': '"Налаштування"',
    '"Admin"': '"Адмін"',
    '"Headquarters"': '"Головний офіс"',
}

for eng, ukr in layout_translations.items():
    layout_content = layout_content.replace(eng, ukr)

with open('src/components/AdminLayout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout_content)
import re

with open('src/pages/AdminPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'>\s*Save\s*<', '>\n                Зберегти\n              <', content)
content = re.sub(r'>\s*Create Ticket\s*<', '>\n                          Створити Тікет\n                        <', content)

translations = {
    ">Ticket Filters<": ">Фільтри Тікетів<",
}

for eng, ukr in translations.items():
    content = content.replace(eng, ukr)

with open('src/pages/AdminPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
