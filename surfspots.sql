CREATE TABLE surfspots (
   id int AUTO_INCREMENT,
   name varchar(100),
   type varchar(100),
   region varchar(100),
   max_wave_height integer,
   PRIMARY KEY (id)
);

INSERT INTO surfspots (name, type, region, max_wave_height) VALUES 
   ('Jaws', 'reef break', 'Maui', 20),
   ('Mavericks', 'reef break', 'California', 25),
   ('Puerto Escondido', 'beach break', 'Mexico', 10),
   ('Teahupoo', 'reef break', 'Tahiti', 7),
   ('Nazare','beach break', 'Portugal', 30);