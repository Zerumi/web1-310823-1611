<?php

error_reporting(-1);

$response = $x = $y = $r = $executed_at = $execution_time = $result = "";

$start_exec = microtime(1);

function containsNumberAfterDecimal($inputString): bool
{
    // Define a regular expression pattern that matches a decimal point followed by a number from 1 to 9.
    $pattern = '/\.0+([1-9])/';

    // Use preg_match() to check if the pattern exists in the inputString.
    return preg_match($pattern, $inputString) === 1;
}

function check_x($x): bool
{
    return $x >= -4 and $x <= 4;
}

function check_y($y): bool
{
    if (str_contains($y, "3.") and containsNumberAfterDecimal($y)) return 0;
    if (str_contains($y, "-5.") and containsNumberAfterDecimal($y)) return 0;
    return $y >= -5 and $y <= 3;
}

function check_r($r): bool
{
    if (str_contains($r, "5.") and containsNumberAfterDecimal($r)) return 0;
    if (str_contains($r, "3.") and containsNumberAfterDecimal($r)) return 0;
    return $r >= 2 and $r <= 5;
}

function check_hit($x, $y, $r): string
{
    // check 1-st section - square
    if ($x >= 0 and $y >= 0 and $x <= $r and $y <= $r) return "Попадание";
    // check 2-nd section - 1/4 circle
    else if ($x <= 0 and $y >= 0 and (pow($x, 2) + pow($y, 2) <= pow($r / 2, 2)))
        return "Попадание";
    // 3-rd section - noting / check 4-th section - triangle
    else if ($x >= 0 and $y <= 0 and abs($x) + abs($y) <= $r) return "Попадание";
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
        http_response_code(400);
    }

    $executed_at = date(DATE_RFC2822);
    $execution_time = (microtime(1) - $start_exec) * 1000;

    $response .= $x .= ";";
    $response .= $y .= ";";
    $response .= $r .= ";";
    $response .= $result .= ";";
    $response .= $executed_at .= ";";
    $response .= number_format($execution_time, 6) . " ms";

    echo $response;
}
