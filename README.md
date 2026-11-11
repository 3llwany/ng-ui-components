# Shared UI Components (Angular + PrimeNG + Tailwind v4)

فولدر الكومبوننتس ده مستقل بذاته (**Self-Contained**) ويشتغل مباشرة في أي مشروع Angular جديد مع **PrimeNG** و **Tailwind CSS v4** بدون أي تعارض.

---

## 1. تنزيل الكومبوننتس في أي مشروع جديد (أوتوماتيك)

### أول مرة على جهازك (إعداد الـ Git Aliases):
شغل الأوامر دي مرة واحدة بس على جهازك:

```powershell
git config --global alias.ui-init '!f() { dir=src/app/shared/ui; if [ -d src/frontend/src/app ]; then dir=src/frontend/src/app/shared/ui; fi; git subtree add --prefix=$dir https://github.com/3llwany/ng-ui-components.git main --squash; }; f'
git config --global alias.ui-pull '!f() { dir=src/app/shared/ui; if [ -d src/frontend/src/app ]; then dir=src/frontend/src/app/shared/ui; fi; git subtree pull --prefix=$dir https://github.com/3llwany/ng-ui-components.git main --squash; }; f'
git config --global --% alias.ui-push "!f() { dir=src/app/shared/ui; if [ -d src/frontend/src/app ]; then dir=src/frontend/src/app/shared/ui; fi; if [ ! -d \"$dir\" ]; then echo \"Error: $dir not found\"; return 1; fi; tmp=$(mktemp -d); git clone --depth 1 https://github.com/3llwany/ng-ui-components.git \"$tmp\" --quiet || { rm -rf \"$tmp\"; return 1; }; if [ $# -gt 0 ]; then targets=\"$@\"; else targets=$(ls -1 \"$dir\"); fi; for item in $targets; do if [ \"$item\" != \"index.ts\" ] && [ -e \"$dir/$item\" ]; then rm -rf \"$tmp/$item\"; cp -r \"$dir/$item\" \"$tmp/$item\"; fi; done; : > \"$tmp/index.ts\"; for d in \"$tmp\"/*/; do c=$(basename \"$d\"); if [ \"$c\" != \"foundation\" ] && [ -f \"$tmp/$c/$c.ts\" ]; then echo \"export * from './$c/$c';\" >> \"$tmp/index.ts\"; fi; done; for f in \"$tmp\"/foundation/*.ts; do b=$(basename \"$f\" .ts); echo \"export * from './foundation/$b';\" >> \"$tmp/index.ts\"; done; cd \"$tmp\"; git add -A; if git diff --cached --quiet; then echo \"No UI changes to push.\"; else msg=\"feat(ui): sync [${*:-all}]\"; git commit -m \"$msg\" && git push origin main; fi; cd - >/dev/null; rm -rf \"$tmp\"; }; f"
git config --global alias.ui-deps '!f() { if [ -f src/frontend/package.json ]; then cd src/frontend; fi; npm i primeng @primeuix/themes primeicons @primeicons/angular tailwindcss @tailwindcss/postcss tailwindcss-primeui @ngx-translate/core @ngx-translate/http-loader; }; f'
git config --global --% alias.ui-add "!f() { if [ $# -eq 0 ]; then echo 'Usage: git ui-add <component> (e.g. button, input, select, datepicker, switch, back-btn)'; return 1; fi; dir=src/app/shared/ui; if [ -d src/frontend/src/app ]; then dir=src/frontend/src/app/shared/ui; fi; mkdir -p \"$dir\"; git fetch https://github.com/3llwany/ng-ui-components.git main --quiet; git archive FETCH_HEAD foundation \"$@\" | tar -x -C \"$dir\"; : > \"$dir/index.ts\"; for d in \"$dir\"/*/; do c=$(basename \"$d\"); if [ \"$c\" != \"foundation\" ] && [ -f \"$dir/$c/$c.ts\" ]; then echo \"export * from './$c/$c';\" >> \"$dir/index.ts\"; fi; done; for f in \"$dir\"/foundation/*.ts; do b=$(basename \"$f\" .ts); echo \"export * from './foundation/$b';\" >> \"$dir/index.ts\"; done; echo \"Done! Added [foundation + $*] and updated $dir/index.ts\"; }; f"
git config --global alias.ui-list '!f() { git fetch https://github.com/3llwany/ng-ui-components.git main --quiet; echo Available UI components:; git ls-tree -d --name-only FETCH_HEAD | grep -v ^foundation$; }; f'
```

### 📋 ملخص كل الأوامر المتاحة (في أي مشروع):

| الكومند | وظيفته |
| :--- | :--- |
| **`git ui-list`** | يعرضلك أسماء كل الكومبوننتس المتاحة في الـ Repo على GitHub |
| **`git ui-add <name>`** | ينزلك كومبوننت واحد (أو أكتر) بالاسم + فولدر `foundation` فقط (مثال: `git ui-add button` , `git ui-add button input select`) |
| **`git ui-init`** | ينزلك **كل** الكومبوننتس دفعة واحدة ويربط الفولدر بـ `git subtree` |
| **`git ui-pull`** | يعمل Upgrade ويسحب آخر التحديثات من الـ Repo |
| **`git ui-push [name]`** | يرفع كومبوننت محدد (مثل `git ui-push badge`) أو كل الكومبوننتس الموجودة في `shared/ui` للـ Repo الأساسي مباشرة (يعمل مع `ui-add` و `ui-init` بدون الحاجة لـ subtree) |
| **`git ui-deps`** | يسطب كل باكدجات الـ `npm` المطلوبة (PrimeNG + Tailwind v4 + Translate) أوتوماتيك |

### في أي مشروع Angular جديد:
1. **تنزيل كل الكومبوننتس دفعة واحدة:**
   ```powershell
   git ui-init
   ```
2. **أو تنزيل كومبوننت واحد (أو أكتر) بالاسم (بنفس فكرة shadcn):**
   ```powershell
   # تنزيل كومبوننت واحد بس (بينزل معاه فولدر foundation تلقائياً)
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
      @apply border-e-0!;
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
تقدر تستخدم `UiThemePreset` الجاهز جوه الفولدر مباشرة (يشتغل سواء استخدمت `ui-add` أو `ui-init`):

```ts
import { providePrimeNG } from 'primeng/config';
import { UiThemePreset } from './shared/ui';

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

## 3. جدول الكومبوننتس الموحد وطريقة الـ Import

كل الكومبوننتس ماشية بنظام تسمية موحد (`<name>/<name>.ts` والكلاس `App<Name>` والـ Selector `<app-...>`):

| اسم الفولدر (`ui-add`) | اسم الكلاس (Class) | الـ Selector في الـ HTML | مسار الملف المباشر |
| :--- | :--- | :--- | :--- |
| **`input`** | `AppInput` | `<app-input>` | `./shared/ui/input/input` |
| **`button`** | `AppButton` | `<app-button>` | `./shared/ui/button/button` |
| **`select`** | `AppSelect` | `<app-select>` | `./shared/ui/select/select` |
| **`datepicker`** | `AppDatepicker` | `<app-datepicker>` | `./shared/ui/datepicker/datepicker` |
| **`switch`** | `AppSwitch` | `<app-switch>` | `./shared/ui/switch/switch` |
| **`card`** | `AppCard` | `<app-card>` | `./shared/ui/card/card` |
| **`dialog`** | `AppDialog` | `<app-dialog>` | `./shared/ui/dialog/dialog` |
| **`back-btn`** | `AppBackBtn` | `<app-back-btn>` | `./shared/ui/back-btn/back-btn` |

```ts
// تقدر تستورد كل الكومبوننتس اللي نزلتها من الفولدر مباشرة (سواء بـ ui-add أو ui-init):
import { AppInput, AppButton, AppSelect, AppDatepicker, AppSwitch, AppCard, AppDialog, AppBackBtn } from './shared/ui';
```

---

## 4. التحديث وإضافة كومبوننتس جديدة

* **سحب آخر التحديثات في مشروعك الحالي:**
  ```powershell
  git ui-pull
  ```
* **رفع كومبوننت جديد أو تعديل للـ Repo الأساسي (يشتغل مع `ui-add` و `ui-init`):**
  ```powershell
  # لرفع كومبوننت معين فقط (مثلاً بعد إنشاء أو تعديل كومبوننت)
  git ui-push button

  # أو لرفع كل الكومبوننتس الموجودة داخل src/app/shared/ui
  git ui-push
  ```

---

## 5. قواعد معمارية (للـ AI Agents والمطورين)

1. **المكتبة Generic فقط (Domain-Agnostic):**
   - فولدر `src/app/shared/ui` مخصص **فقط** للكومبوننتس العامة القابلة لإعادة الاستخدام في أي مشروع (`button`, `input`, `select`, `datepicker`, `switch`, `badge`, إلخ).
   - أي كومبوننت خاص بـ Business Logic أو Feature معينة (مثل `moz-coins-badge`) **يُمنع** وضعه داخل `src/app/shared/ui`، ومكانه الصحيح هو `src/app/features/.../ui` أو `src/app/shared/components`.
2. **مطابقة المسارات (1:1 Folder Mapping):**
   - كل كومبوننت يوضع في فولدر مستقل `src/app/shared/ui/<component-name>`، وهو ما يطابق `<component-name>/` في جذر هذا المستودع بجانب `foundation/`، مما يجعله متاحاً تلقائياً في `git ui-list` و `git ui-add <component-name>`.
3. **الاعتماديات الداخلية (Internal Imports):**
   - الكومبوننتس داخل `src/app/shared/ui/<name>` تستورد احتياجاتها المشتركة فقط من `../foundation/...` ولا تستورد أي شيء من تفاصيل المشروع الخارجي (`features/` أو `core/`).

