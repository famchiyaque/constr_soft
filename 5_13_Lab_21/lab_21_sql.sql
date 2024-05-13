-- Script Laboratorio 19

-- consultas de práctica
USE recortese;

-- #1: La suma de las cantidades e importe total de todas las entregas realizadas durante el 97
SELECT 
    SUM(cantidad) AS total_cantidad, 
    SUM(cantidad * precio * (1 + impuesto)) AS importe_total
FROM entregan
JOIN materiales ON entregan.clave = materiales.clave
WHERE YEAR(fecha) = 1997;

-- #2: Para cada proveedor, obtener la razón social del proveedor, número de entregas e importe total de las entregas realizadas.
SELECT 
    p.razonsocial, 
    COUNT(e.numero) AS num_entregas, 
    SUM(e.cantidad * m.precio * (1 + m.impuesto)) AS importe_total
FROM proveedores p
JOIN entregan e ON p.rfc = e.rfc
JOIN materiales m ON e.clave = m.clave
GROUP BY p.razonsocial;

-- #3: Por cada material obtener la clave y descripción del material, la cantidad total entregada, la mínima cantidad entregada, la máxima cantidad entregada, el importe total de las entregas de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400.
SELECT 
    m.clave, 
    m.descripcion, 
    SUM(e.cantidad) AS cantidad_total, 
    MIN(e.cantidad) AS min_cantidad, 
    MAX(e.cantidad) AS max_cantidad, 
    SUM(e.cantidad * m.precio * (1 + m.impuesto)) AS importe_total
FROM materiales m
JOIN entregan e ON m.clave = e.clave
GROUP BY m.clave, m.descripcion
HAVING AVG(e.cantidad) > 400;

-- #4: Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada material entregado, detallando la clave y descripción del material, excluyendo aquellos proveedores para los que la cantidad promedio sea menor a 500.
SELECT 
    p.razonsocial, 
    m.clave, 
    m.descripcion, 
    AVG(e.cantidad) AS cantidad_promedio
FROM proveedores p
JOIN entregan e ON p.rfc = e.rfc
JOIN materiales m ON e.clave = m.clave
GROUP BY p.razonsocial, m.clave, m.descripcion
HAVING AVG(e.cantidad) >= 500;

-- #5: Mostrar en una sola consulta los mismos datos que en la consulta anterior pero para dos grupos de proveedores: aquellos para los que la cantidad promedio entregada es menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450.
WITH proveedores_grupo AS (
    SELECT p.rfc, AVG(e.cantidad) AS cantidad_promedio
    FROM proveedores p
    JOIN entregan e ON p.rfc = e.rfc
    GROUP BY p.rfc
)
SELECT 
    p.razonsocial, 
    m.clave, 
    m.descripcion, 
    AVG(e.cantidad) AS cantidad_promedio
FROM proveedores_grupo pg
JOIN proveedores p ON pg.rfc = p.rfc
JOIN entregan e ON p.rfc = e.rfc
JOIN materiales m ON e.clave = m.clave
WHERE pg.cantidad_promedio < 370 OR pg.cantidad_promedio > 450
GROUP BY p.razonsocial, m.clave, m.descripcion, pg.cantidad_promedio;

-- Inserción de cinco nuevos materiales
INSERT INTO materiales (clave, descripcion, precio, impuesto) VALUES
	(2010, 'Varilla 7/11', 170, 10),
	(2020, 'Varilla 5/16', 44000, 11.5),
	(2030, 'Varilla 2/19', 2145, 13),
	(2040, 'Varilla 6/90', 2048, 14.5),
	(2050, 'Varilla 4/20', 10, 16);

-- #6: Clave y descripción de los materiales que nunca han sido entregados
SELECT m.clave, m.descripcion
FROM materiales m
LEFT JOIN entregan e ON m.clave = e.clave
WHERE e.clave IS NULL;

-- #7: Razón social de los proveedores que han realizado entregas tanto al proyecto 'Vamos México' como al proyecto 'Querétaro Limpio'
SELECT DISTINCT p.razonsocial
FROM proveedores p
INNER JOIN entregan e1 ON p.rfc = e1.rfc
INNER JOIN proyectos pr1 ON e1.numero = pr1.numero AND pr1.denominacion = 'Vamos México'
INNER JOIN entregan e2 ON p.rfc = e2.rfc
INNER JOIN proyectos pr2 ON e2.numero = pr2.numero AND pr2.denominacion = 'Querétaro Limpio';

-- #8: Descripción de los materiales que nunca han sido entregados al proyecto 'CIT Yucatán'
SELECT m.descripcion
FROM materiales m
WHERE m.clave NOT IN (
    SELECT DISTINCT e.clave
    FROM entregan e
    INNER JOIN proyectos pr ON e.numero = pr.numero
    WHERE pr.denominacion = 'CIT Yucatán'
);

-- #9: Razón social y promedio de cantidad entregada de los proveedores cuyo promedio de cantidad entregada es mayor al promedio de la cantidad entregada por el proveedor con el RFC 'VAGO780901'
SELECT p.razonsocial, AVG(e.cantidad) AS promedio_entregado
FROM proveedores p
INNER JOIN entregan e ON p.rfc = e.rfc
GROUP BY p.razonsocial
HAVING AVG(e.cantidad) > (
    SELECT AVG(e2.cantidad)
    FROM entregan e2
    WHERE e2.rfc = 'VAGO780901'
);

-- #10: RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit Durango' y cuyas cantidades totales entregadas en el 2000 fueron mayores a las cantidades totales entregadas en el 2001
SELECT p.rfc, p.razonsocial
FROM proveedores p
INNER JOIN entregan e ON p.rfc = e.rfc
INNER JOIN proyectos pr ON e.numero = pr.numero AND pr.denominacion = 'Infonavit Durango'
GROUP BY p.rfc, p.razonsocial
HAVING SUM(CASE WHEN YEAR(e.fecha) = 2000 THEN e.cantidad ELSE 0 END) >
       SUM(CASE WHEN YEAR(e.fecha) = 2001 THEN e.cantidad ELSE 0 END);