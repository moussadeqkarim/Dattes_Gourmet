# Dattes Gourmets

Luxury French storefront for high-end Moroccan stuffed dates, built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.local.example .env.local
```

3. Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-or-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER=212600000000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. In Supabase SQL Editor, run:

```text
supabase/001_initial_schema.sql
```

5. Create the first admin user in Supabase Auth, then mark them as admin:

```sql
update public.profiles
set is_admin = true
where email = 'admin@example.com';
```

6. Start the app:

```bash
npm run dev
```

## Deployment on Vercel

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Add the same environment variables in Vercel Project Settings.
4. Deploy.

## Main Routes

- `/` storefront, menu, flavors, and order modal.
- `/paiement` payment instructions.
- `/contact` WhatsApp/contact page.
- `/mentions-legales` Moroccan legal notice placeholder.
- `/politique-confidentialite` privacy policy placeholder.
- `/admin/login` admin login.
- `/admin` protected order dashboard.

## Notes

- Customer-facing copy is written in French.
- Technical instructions and code comments are written in English.
- Replace placeholder contact, banking, legal, and image details before launch.
