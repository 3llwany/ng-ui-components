# Shared UI Components (Angular + PrimeNG + Tailwind v4)

فولدر الكومبوننتس ده مستقل بذاته (**Self-Contained**) ويشتغل مباشرة في أي مشروع Angular جديد مع **PrimeNG** و **Tailwind CSS v4** بدون أي تعارض.

---

## 1. تنزيل الكومبوننتس في أي مشروع جديد (أوتوماتيك)

### أول مرة على جهازك (إعداد الـ Git Aliases):
شغل الأوامر دي مرة واحدة بس على جهازك (مع استبدال `YOUR_REPO_URL` برابط الـ Repo الخاص بيك على GitHub):

```powershell
git config --global alias.ui-init '!f() { dir=src/app/shared/components; if [ -d src/frontend/src/app ]; then dir=src/frontend/src/app/shared/components; fi; git subtree add --prefix=$dir https://github.com/3llwany/ng-ui-components.git main --squash; }; f'
git config --global alias.ui-pull '!f() { dir=src/app/shared/components; if [ -d src/frontend/src/app ]; then dir=src/frontend/src/app/shared/components; fi; git subtree pull --prefix=$dir https://github.com/3llwany/ng-ui-components.git main --squash; }; f'
git config --global alias.ui-push '!f() { dir=src/app/shared/components; if [ -d src/frontend/src/app ]; then dir=src/frontend/src/app/shared/components; fi; git subtree push --prefix=$dir https://github.com/3llwany/ng-ui-components.git main; }; f'
git config --global alias.ui-deps '!f() { if [ -f src/frontend/package.json ]; then cd src/frontend; fi; npm i primeng @primeuix/themes primeicons @primeicons/angular tailwindcss @tailwindcss/postcss tailwindcss-primeui @ngx-translate/core @ngx-translate/http-loader; }; f'
git config --global --% alias.ui-add "!f() { if [ $# -eq 0 ]; then echo 'Usage: git ui-add <component> (e.g. button, input, select, datepicker, switch, back-btn)'; return 1; fi; dir=src/app/shared/components; if [ -d src/frontend/src/app ]; then dir=src/frontend/src/app/shared/components; fi; mkdir -p \"$dir\"; git fetch https://github.com/3llwany/ng-ui-components.git main --quiet; git archive FETCH_HEAD core \"$@\" | tar -x -C \"$dir\"; echo \"Done! Added [core + $*] into $dir\"; }; f"
git config --global alias.ui-list '!f() { git fetch https://github.com/3llwany/ng-ui-components.git main --quiet; echo "Available UI components:"; git ls-tree -d --name-only FETCH_HEAD | grep -v "^core$"; }; f'
```

### 📋 ملخص كل الأوامر المتاحة (في أي مشروع):

| الكومند | وظيفته |
| :--- | :--- |
| **`git ui-list`** | يعرضلك أسماء كل الكومبوننتس المتاحة في الـ Repo على GitHub |
| **`git ui-add <name>`** | ينزلك كومبوننت واحد (أو أكتر) بالاسم + فولدر `core` فقط (مثال: `git ui-add button` , `git ui-add button input select`)) |
| **`git ui-init`** | ينزلك **كل** الكومبوننتس دفعة واحدة ويربط الفولدر بـ `git subtree` |
| **`git ui-pull`** | يعمل Upgrade ويسحب آخر التحديثات من الـ Repo |
| **`git ui-push`** | يرفع أي كومبوننت جديد أو تعديل عملته للـ Repo الأساسي |
| **`git ui-deps`** | يسطب كل باكدجات الـ `npm` المطلوبة (PrimeNG + Tailwind v4 + Translate) أوتوماتيك |

### في أي مشروع Angular جديد:
1. **تنزيل كل الكومبوننتس دفعة واحدة:**
   ```powershell
   git ui-init
   ```
2. **أو تنزيل كومبوننت واحد (أو أكتر) بالاسم (بنفس فكرة shadcn):**
   ```powershell
   # تنزيل كومبوننت واحد بس (بينزل معاه فولدر core تلقائياً)
   git ui-add button

   # أو تنزيل أكتر من كومبوننت مع بعض
   git ui-add input select

   # لمعرفة أسماء كل الكومبوننتس المتاحة في الـ Repo
   git ui-list
   ```
3. **تسطيب الباكدجات المطلوبة بكومند واحد:**
   ```powershell
   git ui-deps
   ```

---

## 2. إعدادات Tailwind v4 مع PrimeNG (لمنع أي تعارض)

### أ) ملف `.postcssrc.json` في الروت بتاع المشروع:
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

### ب) ملف `src/styles.css`:
ترتيب الـ `@layer` هنا هو اللي بيضمن إن كلاسات Tailwind و `tailwindcss-primeui` تشتغل مع PrimeNG من غير أي تضارب:

```css
@import 'tailwindcss';
@import 'tailwindcss-primeui';
@import 'primeicons/primeicons.css';
@custom-variant dark (&:where(.app-dark, .app-dark *));
@layer tailwind-base, primeng, tailwind-utilities;

@layer tailwind-base {
  .p-icon {
    @apply w-4! h-4!;
  }
  button {
    @apply cursor-pointer;
  }
  .p-datepicker {
    .p-inputtext {
      @apply rtl:border-l-0! ltr:border-r-0!;
    }
  }
}

.p-inputnumber,
.p-inputnumber-input {
  width: 100% !important;
  min-width: 0 !important;
}
```

### ج) ملف `src/app/app.config.ts`:
تقدر تستخدم `UiThemePreset` الجاهز جوه الفولدر مباشرة:

```ts
import { providePrimeNG } from 'primeng/config';
import { UiThemePreset } from './shared/components';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    providePrimeNG({
      theme: {
        preset: UiThemePreset,
        options: {
          darkModeSelector: '.app-dark',
        },
      },
    }),
  ],
};
```

---

## 3. التحديث وإضافة كومبوننتس جديدة

* **سحب آخر التحديثات في مشروعك الحالي:**
  ```powershell
  git ui-pull
  ```
* **رفع كومبوننت جديد أو تعديل للـ Repo الأساسي (بعد عمل `git commit`):**
  ```powershell
  git ui-push
  ```
