# Shared UI Components (Angular + PrimeNG + Tailwind v4)

فولدر الكومبوننتس ده مستقل بذاته (**Self-Contained**) ويشتغل مباشرة في أي مشروع Angular جديد مع **PrimeNG** و **Tailwind CSS v4** بدون أي تعارض.

---

## 1. تنزيل الكومبوننتس في أي مشروع جديد (أوتوماتيك)

### أول مرة على جهازك (إعداد الـ Git Aliases):
شغل الأوامر دي مرة واحدة بس على جهازك (مع استبدال `YOUR_REPO_URL` برابط الـ Repo الخاص بيك على GitHub):

```powershell
git config --global alias.ui-init '!git subtree add --prefix=src/app/shared/components https://github.com/3llwany/ng-ui-components.git main --squash'
git config --global alias.ui-pull '!git subtree pull --prefix=src/app/shared/components https://github.com/3llwany/ng-ui-components.git main --squash'
git config --global alias.ui-push '!git subtree push --prefix=src/app/shared/components https://github.com/3llwany/ng-ui-components.git main'
```

### في أي مشروع Angular جديد:
1. نزّل الكومبوننتس بكومند واحد:
   ```powershell
   git ui-init
   ```
2. سطب الباكدجات المطلوبة:
   ```powershell
   npm i primeng @primeuix/themes primeicons @primeicons/angular tailwindcss @tailwindcss/postcss tailwindcss-primeui @ngx-translate/core @ngx-translate/http-loader
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
