use recortese;
select * from materiales;











select * from entregan;
select * from materiales
where clave=1000;
select clave,rfc,fecha from entregan;
select * from materiales,entregan
where materiales.clave = entregan.clave;
select * from entregan,proyectos
where entregan.numero <= proyectos.numero;
(select * from entregan where clave=1450)
union
(select * from entregan where clave=1300);
select * from entregan,materiales;
select materiales.descripcion from entregan, materiales 
where year(fecha) = 2000;
select distinct materiales.descripcion from entregan, materiales 
where year(fecha) = 2000;
SELECT * FROM entregan WHERE clave = 1300 OR clave = 1450;
select * from proyectos;
select p.numero, p.denominacion, e.fecha, e.cantidad
from proyectos as p
inner join entregan as e on p.numero = e.numero
order by p.numero asc, e.fecha desc;
select numero + 10000 as "Proyecto + mil" from proyectos;
SELECT * FROM proyectos where denominacion LIKE 'mexico';
SELECT * FROM proyectos where denominacion LIKE '%mexico%';
SELECT * FROM entregan WHERE rfc LIKE '[A-D]%';
SELECT RFC FROM Entregan WHERE RFC LIKE '[^A]%';
SELECT Numero FROM Entregan WHERE Numero LIKE '___6';
SELECT RFC,Cantidad, Fecha,Numero
FROM Entregan
WHERE Numero Between 5000 and 5010 AND
Exists ( SELECT RFC
FROM Proveedores
WHERE RazonSocial LIKE 'La%' and Entregan.RFC = Proveedores.RFC );
SELECT RFC, Cantidad, Fecha, Numero FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010 
AND RFC IN (
    SELECT RFC
    FROM Proveedores
    WHERE RazonSocial LIKE 'La%'
);
ALTER TABLE materiales ADD COLUMN Impuesto NUMERIC (6,2);
select * from materiales;
SELECT *, (m.precio * (1 + m.impuesto*0.01) * e.cantidad) AS total 
FROM materiales AS m INNER JOIN entregan AS e;
