# 📱 PixDex

Aplicación móvil desarrollada en React Native con Expo.

## 🚀 Instalación

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Supabase

#### 2.1 Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Guarda la URL y la anon key 

#### 2.2 Configurar variables de entorno
1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` y reemplaza las credenciales:
```env
EXPO_PUBLIC_SUPABASE_URL=tu_supabase_project_url_aqui
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
```

#### 2.3 Configurar base de datos
Ejecuta el siguiente SQL en el editor SQL de Supabase:

```sql
-- =====================================================
-- CONFIGURACIÓN DE TABLAS PARA PIXDEX - AHORCADO
-- =====================================================

-- Habilitar la extensión UUID si no está habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLA DE PUNTUACIONES (SOLO AHORCADO)
-- =====================================================
CREATE TABLE IF NOT EXISTS puntuaciones_ahorcado (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_puntuaciones_ahorcado_score ON puntuaciones_ahorcado(score DESC);
CREATE INDEX IF NOT EXISTS idx_puntuaciones_ahorcado_user_id ON puntuaciones_ahorcado(user_id);
CREATE INDEX IF NOT EXISTS idx_puntuaciones_ahorcado_created_at ON puntuaciones_ahorcado(created_at DESC);

-- =====================================================
-- FUNCIÓN PARA ACTUALIZAR updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- TRIGGER PARA ACTUALIZAR updated_at
-- =====================================================
CREATE TRIGGER update_puntuaciones_ahorcado_updated_at 
    BEFORE UPDATE ON puntuaciones_ahorcado 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- HABILITAR RLS (Row Level Security)
-- =====================================================
ALTER TABLE puntuaciones_ahorcado ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLÍTICAS RLS PARA PUNTUACIONES AHORCADO
-- =====================================================

-- Permitir a usuarios autenticados ver todas las puntuaciones (para top 10)
CREATE POLICY "Usuarios pueden ver todas las puntuaciones" ON puntuaciones_ahorcado
    FOR SELECT USING (auth.role() = 'authenticated');

-- Permitir a usuarios autenticados insertar sus puntuaciones
CREATE POLICY "Usuarios pueden insertar sus puntuaciones" ON puntuaciones_ahorcado
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Permitir a usuarios autenticados actualizar sus puntuaciones
CREATE POLICY "Usuarios pueden actualizar sus puntuaciones" ON puntuaciones_ahorcado
    FOR UPDATE USING (auth.uid() = user_id);

-- Permitir a usuarios autenticados eliminar sus puntuaciones
CREATE POLICY "Usuarios pueden eliminar sus puntuaciones" ON puntuaciones_ahorcado
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- FUNCIÓN PARA OBTENER TOP 10 PUNTUACIONES
-- =====================================================
CREATE OR REPLACE FUNCTION get_top_puntuaciones_ahorcado(
    p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    player_name TEXT,
    score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE,
    rank_position INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.player_name,
        p.score,
        p.created_at,
        (ROW_NUMBER() OVER (ORDER BY p.score DESC, p.created_at ASC))::integer as rank_position
    FROM puntuaciones_ahorcado p
    ORDER BY p.score DESC, p.created_at ASC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCIÓN PARA INSERTAR/ACTUALIZAR PUNTUACIÓN
-- =====================================================
CREATE OR REPLACE FUNCTION upsert_puntuacion_ahorcado(
    p_user_id UUID,
    p_player_name TEXT,
    p_score INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
    current_score INTEGER;
    score_updated BOOLEAN := FALSE;
BEGIN
    -- Obtener la puntuación actual del usuario
    SELECT score INTO current_score 
    FROM puntuaciones_ahorcado 
    WHERE user_id = p_user_id;
    
    -- Si no existe puntuación o la nueva es mayor, insertar/actualizar
    IF current_score IS NULL OR p_score > current_score THEN
        INSERT INTO puntuaciones_ahorcado (user_id, player_name, score)
        VALUES (p_user_id, p_player_name, p_score)
        ON CONFLICT (user_id) 
        DO UPDATE SET 
            player_name = EXCLUDED.player_name,
            score = EXCLUDED.score,
            updated_at = NOW();
        
        score_updated := TRUE;
    END IF;
    
    RETURN score_updated;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCIÓN PARA OBTENER PUNTUACIÓN DE UN USUARIO
-- =====================================================
CREATE OR REPLACE FUNCTION get_user_puntuacion_ahorcado(
    p_user_id UUID
)
RETURNS TABLE (
    id UUID,
    player_name TEXT,
    score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.player_name,
        p.score,
        p.created_at,
        p.updated_at
    FROM puntuaciones_ahorcado p
    WHERE p.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

-- Verificar que la tabla se creó correctamente
SELECT 
    table_name, 
    column_name, 
    data_type 
FROM information_schema.columns 
WHERE table_name = 'puntuaciones_ahorcado'
ORDER BY ordinal_position;

-- Verificar que RLS está habilitado
SELECT 
    schemaname, 
    tablename, 
    rowsecurity 
FROM pg_tables 
WHERE tablename = 'puntuaciones_ahorcado';
```

### 3. Ejecutar la aplicación
```bash
npx expo start 
```
Si no funciona probar con:
```bash
npx expo start --tunnel
```
---

