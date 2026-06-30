-- Supabase Database Setup for NexCode Extension Marketplace
-- Run this SQL in your Supabase SQL Editor

-- Create extensions table
CREATE TABLE IF NOT EXISTS extensions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    author_url TEXT,
    description TEXT NOT NULL,
    version TEXT NOT NULL,
    installs BIGINT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    rating_count INTEGER DEFAULT 0,
    price TEXT DEFAULT 'Free',
    categories TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    last_updated DATE DEFAULT CURRENT_DATE,
    icon TEXT DEFAULT 'python',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_extensions_installs ON extensions(installs DESC);
CREATE INDEX IF NOT EXISTS idx_extensions_rating ON extensions(rating DESC);
CREATE INDEX IF NOT EXISTS idx_extensions_name ON extensions(name);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_extensions_updated_at BEFORE UPDATE ON extensions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO extensions (id, name, author, author_url, description, version, installs, rating, rating_count, price, categories, tags, last_updated, icon) VALUES
('ms-python.python', 'Python', 'Microsoft', 'microsoft.com', 'Python language support with extension access points for IntelliSense (Pylance), Debugging (Python Debugger), linting, formatting, refactoring, unit tests, and more.', '2024.0.0', 225295733, 4.5, 630, 'Free', ARRAY['Programming Languages', 'Debuggers', 'Data Science'], ARRAY['debuggers', 'django', 'ini', 'jinja', 'json', 'keybindings', 'language-model-tools', 'linters', 'multi-root ready', 'piprequirements', 'pip-requirements', 'python', 'requirements.txt', 'toml', 'tools', 'unittest', 'yaml'], '2024-01-15', 'python'),
('ms-python.vscode-pylance', 'Pylance', 'Microsoft', 'microsoft.com', 'A performant, feature-rich language server for Python in VS Code, providing fast IntelliSense, type checking, and code navigation.', '2024.0.0', 150000000, 4.6, 450, 'Free', ARRAY['Programming Languages'], ARRAY['python', 'intellisense', 'type-checking', 'language-server'], '2024-01-10', 'pylance'),
('ms-python.debugpy', 'Python Debugger', 'Microsoft', 'microsoft.com', 'Debug Python code with breakpoints, call stacks, and an interactive console. Supports local and remote debugging.', '2024.0.0', 120000000, 4.5, 380, 'Free', ARRAY['Debuggers'], ARRAY['debuggers', 'python', 'debugging'], '2024-01-08', 'debugger'),
('ReSharper.csharp', 'C# by ReSharper', 'JetBrains', 'jetbrains.com', 'C# language support powered by ReSharper. Provides IntelliSense, code analysis, refactoring, and more.', '1.0.0', 57700, 4.7, 120, 'Free', ARRAY['Programming Languages'], ARRAY['csharp', 'resharper', 'intellisense'], '2024-01-12', 'csharp'),
('golang.go', 'Toolitude for Go', 'Tooltitude Team', 'tooltitude.com', 'Go language support with IntelliSense, debugging, and integrated tooling for Go development.', '0.30.0', 30600, 4.4, 85, 'Free', ARRAY['Programming Languages'], ARRAY['go', 'golang', 'debugging'], '2024-01-05', 'go'),
('aspire.aspire', 'Aspire', 'Microsoft', 'microsoft.com', 'Aspire helps you build resilient, observable, and configurable cloud-native applications with .NET.', '8.0.0', 26900, 4.6, 95, 'Free', ARRAY['Programming Languages', 'Cloud'], ARRAY['aspire', 'dotnet', 'cloud-native'], '2024-01-14', 'aspire'),
('shyylol.theme-switcher', 'Theme Switcher', 'shyylol', 'shyylol', 'Quickly switch between themes with a customizable keyboard shortcut. Supports light, dark, and custom themes.', '1.0.0', 9100, 4.3, 45, 'Free', ARRAY['Themes'], ARRAY['theme', 'customization', 'ui'], '2023-12-20', 'theme'),
('RedCMD.json-embedded-lang', 'JSON Embedded Lang', 'RedCMD', 'RedCMD', 'Adds syntax highlighting for embedded languages in JSON files. Supports JSON with comments, JSONC, and more.', '1.2.0', 1200, 4.5, 30, 'Free', ARRAY['Programming Languages'], ARRAY['json', 'syntax-highlighting', 'embedded-languages'], '2024-01-02', 'json'),
('barisozgen.mesh-graph', 'Mesh Graph', 'Baris Ozgen', 'barisozgen', 'Visualize and explore mesh data structures with interactive 3D graphs. Perfect for computational geometry and mesh processing.', '1.0.0', 1000, 4.2, 15, 'Free', ARRAY['Data Science', 'Visualization'], ARRAY['mesh', '3d', 'visualization', 'graph'], '2023-12-15', 'mesh');

-- Enable Row Level Security (RLS)
ALTER TABLE extensions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON extensions
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON extensions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON extensions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON extensions
    FOR DELETE USING (auth.role() = 'authenticated');

-- Add file_url and file_path columns if they don't exist
ALTER TABLE extensions ADD COLUMN IF NOT EXISTS file_url TEXT;
ALTER TABLE extensions ADD COLUMN IF NOT EXISTS file_path TEXT;

-- Create storage bucket for extension files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('extensions', 'extensions', true, 52428800, ARRAY['application/zip', 'application/octet-stream'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'extensions');

CREATE POLICY "Authenticated Upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'extensions' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Update" ON storage.objects
    FOR UPDATE USING (bucket_id = 'extensions' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Delete" ON storage.objects
    FOR DELETE USING (bucket_id = 'extensions' AND auth.role() = 'authenticated');
