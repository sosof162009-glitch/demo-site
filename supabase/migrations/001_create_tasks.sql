-- إنشاء جدول المهام
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تفعيل RLS (Row Level Security)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- سياسة: السماح للجميع بقراءة
CREATE POLICY "Allow public read" ON tasks
  FOR SELECT USING (true);

-- سياسة: السماح للجميع بإضافة
CREATE POLICY "Allow public insert" ON tasks
  FOR INSERT WITH CHECK (true);

-- سياسة: السماح للجميع بتعديل
CREATE POLICY "Allow public update" ON tasks
  FOR UPDATE USING (true);

-- سياسة: السماح للجميع بحذف
CREATE POLICY "Allow public delete" ON tasks
  FOR DELETE USING (true);
