# Configuración de API

## Variables de Entorno

Para configurar la URL de la API, crea un archivo `.env` en la raíz del proyecto con:

```
EXPO_PUBLIC_API_URL=http://localhost:8081
```

## Endpoints Disponibles

- `GET /contenidos` - Obtiene todos los contenidos audiovisuales
- `GET /tipos` - Obtiene todos los tipos de contenido
- `GET /generos` - Obtiene todos los géneros

## Fallback

Si la API no está disponible, la aplicación cargará automáticamente los datos locales desde `src/data/`. 