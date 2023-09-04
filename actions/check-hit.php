<?php

error_reporting(-1);

$response = $x = $y = $r = $executed_at = $execution_time = $result = "";

$start_exec = microtime(1);

function check_x($x): bool
{
    return $x >= -4 and $x <= 4;
}

function check_y($y): bool
{
    return $y >= -5 and $y <= 3;
}

function check_r($r): bool
{
    return $r >= 2 and $r <= 5;
}

function check_hit($x, $y, $r): string
{
    // check 1-st section - square
    if ($x >= 0 and $y >= 0 and $x <= $r and $y <= $r) return "Попадание";
    // check 2-nd section - 1/4 circle
    else if ($x < 0 and $y > 0 and (pow($x, 2) + pow($y, 2) <= pow($r / 2, 2)))
        return "Попадание";
    // 3-rd section - noting / check 4-th section - triangle
    else if ($x > 0 and $y < 0 and abs($x) + abs($y) <= $r) return "Попадание";
    // everything else is miss
    else return "Промах";
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $x = $_GET["x-select"];
    $y = $_GET["y-select"];
    $r = $_GET["r-select"];

    if (check_x($x) and check_y($y) and check_r($r)) {
        $result = check_hit($x, $y, $r);
    } else {
        $result = "Ошибка введенных данных";
    }

    $executed_at = date(DATE_RFC2822);
    $execution_time = microtime(1) - $start_exec;

    $response .= $x .= ";";
    $response .= $y .= ";";
    $response .= $r .= ";";
    $response .= $result .= ";";
    $response .= $executed_at .= ";";
    $response .= $execution_time;

    echo $response;
}
