'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Task {
  id: number
  title: string
  completed: boolean
  created_at: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState('')

  // جلب المهام
  const fetchTasks = async () => {
    setStatus('جاري جلب البيانات...')
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('خطأ في جلب المهام: ' + error.message)
      setStatus('❌ فشل الاتصال')
    } else {
      setTasks(data || [])
      setError(null)
      setStatus(`✅ تم جلب ${data?.length || 0} مهمة`)
    }
    setLoading(false)
  }

  // إضافة مهمة
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    setStatus('جاري الإضافة...')
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: newTask, completed: false }])
      .select()

    if (error) {
      setError('خطأ في الإضافة: ' + error.message)
      setStatus('❌ فشل الإضافة')
    } else {
      setNewTask('')
      setTasks([data[0], ...tasks])
      setStatus('✅ تمت الإضافة')
    }
  }

  // تبديل حالة المهمة
  const toggleTask = async (id: number, completed: boolean) => {
    setStatus('جاري التحديث...')
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !completed })
      .eq('id', id)

    if (error) {
      setError('خطأ في التحديث: ' + error.message)
      setStatus('❌ فشل التحديث')
    } else {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !completed } : t))
      setStatus('✅ تم التحديث')
    }
  }

  // حذف مهمة
  const deleteTask = async (id: number) => {
    setStatus('جاري الحذف...')
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    if (error) {
      setError('خطأ في الحذف: ' + error.message)
      setStatus('❌ فشل الحذف')
    } else {
      setTasks(tasks.filter(t => t.id !== id))
      setStatus('✅ تم الحذف')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 اختبار Supabase CRUD</h1>
        <p className="text-gray-600 mb-6">صفحة تجريبية لاختبار الربط مع قاعدة البيانات</p>

        {/* حالة الاتصال */}
        <div className={`p-3 rounded-lg mb-4 text-sm ${status.includes('❌') ? 'bg-red-100 text-red-700' : status.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
          {status || 'جاري التحميل...'}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
            <p className="font-bold">⚠️ خطأ:</p>
            <p>{error}</p>
            <p className="text-sm mt-2">تأكد من إنشاء جدول tasks في Supabase</p>
          </div>
        )}

        {/* نموذج إضافة */}
        <form onSubmit={addTask} className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="مهمة جديدة..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!newTask.trim()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              إضافة
            </button>
          </div>
        </form>

        {/* قائمة المهام */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-8 text-center text-gray-500">جاري التحميل...</div>
          ) : tasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              لا توجد مهام
              <br />
              <span className="text-sm">أضف أول مهمة أو تأكد من إنشاء الجدول في Supabase</span>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li key={task.id} className="p-4 flex items-center gap-3 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id, task.completed)}
                    className="w-5 h-5 text-blue-500 rounded cursor-pointer"
                  />
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(task.created_at).toLocaleDateString('ar-SA')}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* معلومات تقنية */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <h3 className="font-bold mb-2">ℹ️ معلومات:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Supabase URL: nrylirwsluaduvolkdsp.supabase.co</li>
            <li>المتغيرات محملة في Vercel</li>
            <li>لإنشاء الجدول: اذهب لـ Supabase Dashboard → SQL Editor → New query → الصق محتوى ملف 001_create_tasks.sql</li>
          </ul>
        </div>
      </div>
    </div>
 )
}
