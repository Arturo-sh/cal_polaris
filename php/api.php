<?php

header('Content-Type: application/json'); // Establecemos el encabezado para indicar que la respuesta será en formato JSON

include_once "./conn_db.php"; // Conexión a la base de datos

// Comprobamos si la solicitud es POST o GET para manejar los parámetros
if ($_SERVER["REQUEST_METHOD"] == "GET" || $_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtenemos los parámetros de búsqueda
    $search = isset($_REQUEST['search']) ? trim($_REQUEST['search']) : '';

    if ($search == "") {
        $data = json_encode([
            'status' => 'error',
            'message' => 'The search_key field cannot be empty',
        ]);
        die($data);
    }

    $query_all = "SELECT t.id, t.fecha, t.id_turno, s.nombre, s.horario FROM trabajo AS t INNER JOIN turno AS s ON t.id_turno = s.id ORDER BY t.id ASC";
    $result = mysqli_query($conn, $query_all);
    if ($result) {
        $n_rows = mysqli_num_rows($result);
        $data = [];

        // Si hay resultados, los agregamos al array de respuesta
        if ($n_rows > 0) {
          while ($row = mysqli_fetch_assoc($result)) {
            /*
            if ($row['id_turno'] == 1) {
              $start = $row['fecha'] . "T07:00:00";
              $end = $row['fecha'] . "T19:00:00";
            } else if ($row['id_turno'] == 2) {
              $start = $row['fecha'] . "T19:00:00";
              $date = new DateTime($row['fecha']);
              $date->modify('+1 day');
              $end = $date->format('Y-m-d') . "T07:00:00";
              
              // $fecha = date('Y-m-d', strtotime($row['fecha'] . ' +1 day'));
              // $end = $fecha . "T07:00:00";
            }
            */

            $data[] = [
                'title' => "[" . $row['id'] . "] Turno: " . $row['nombre'],
                'start' => $row['fecha']
                // 'start' => $start,
                // 'end' => $end
                ];
            }
        }

        // Devolvemos los resultados en formato JSON
        echo json_encode($data);
    } else {
        // Si hay un error en la consulta, devolvemos un mensaje de error
        echo json_encode([
            'status' => 'error',
            'message' => 'No se pudo realizar la consulta o no se encontraron resultados.'
        ]);
    }
} else {
    // Si no es un método GET o POST, devolvemos un error
    echo json_encode([
        'status' => 'error',
        'message' => 'Método no permitido!'
    ]);
}

  mysqli_close($conn);
?>
