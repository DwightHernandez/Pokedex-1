
---

# Pokédex Pokémon

Este proyecto es una página web que muestra información sobre diferentes Pokémon y permite filtrarlos por tipo. Utiliza datos de la API de Pokémon y una API local (JSON Server) para almacenar información adicional sobre los Pokémon.

## Uso

A continuación se describen los pasos para utilizar la página web:

1. **Clonar el repositorio**:
   Clona este repositorio en tu máquina local utilizando Git:
   ```
   git clone https://github.com/tu_usuario/pokemon-pokedex.git
   ```

2. **Instalar JSON Server**:
   Este proyecto utiliza JSON Server para simular una API local. Asegúrate de tener [JSON Server](https://github.com/typicode/json-server) instalado globalmente. Si no lo tienes, puedes instalarlo con npm:
   ```
   npm install -g json-server
   ```

3. **Iniciar JSON Server**:
   Inicia JSON Server para simular la API local ejecutando el siguiente comando desde la raíz del proyecto:
   ```
   json-server --watch db.json --port 5050
   ```

4. **Abrir la página en un navegador**:
   Abre el archivo `index.html` en tu navegador preferido. Puedes hacerlo directamente desde el explorador de archivos o utilizando un servidor local.

5. **Explorar Pokémon**:
   - Al abrir la página, verás una lista de Pokémon.
   - Haz clic en "Ver todos" para mostrar todos los Pokémon disponibles.
   - También puedes filtrar los Pokémon por tipo haciendo clic en los botones correspondientes (por ejemplo, "Fire" para ver Pokémon de tipo fuego).

6. **Buscar Pokémon**:
   - Utiliza el formulario de búsqueda en la sección "Pokedex" para buscar un Pokémon por nombre. Ingresa el nombre y presiona Enter.

7. **Ver detalles de un Pokémon**:
   - Haz clic en un Pokémon para ver detalles adicionales, como su imagen y estadísticas.
   - Puedes modificar las estadísticas y guardar una nueva versión del Pokémon.

8. **Guardar una nueva versión de un Pokémon**:
   - Modifica las estadísticas utilizando las barras deslizantes en la sección de estadísticas.
   - Haz clic en "Guardar Nueva Versión" para almacenar las estadísticas actualizadas en la base de datos local.

## Requisitos del sistema

- Navegador web moderno (Chrome, Firefox, Safari, Edge, etc.).
- [JSON Server](https://github.com/typicode/json-server) instalado globalmente.

---
