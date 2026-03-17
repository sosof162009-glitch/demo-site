import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black" dir="rtl">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            👋 مرحباً!
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            المشروع متصل بـ Supabase وجاهز للاختبار. جرب صفحة المهام لتجربة 
            إضافة، قراءة، تعديل، وحذف البيانات.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 text-base font-medium w-full sm:flex-row">
          <Link
            href="/tasks"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-white transition-colors hover:bg-blue-700 md:w-[180px]"
          >
            📋 اختبار المهام
          </Link>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[180px]"
            href="https://github.com/sosof162009-glitch/demo-site"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 GitHub
          </a>
        </div>

        <div className="text-sm text-zinc-400 mt-8">
          <p>Supabase: nrylirwsluaduvolkdsp.supabase.co</p>
        </div>
      </main>
    </div>
  );
}
