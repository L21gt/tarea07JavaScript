/******************** LABORATORIO III ****************************
 * 
 * Modifica la clase Extended (reescríbela) añadiéndole un método match estático.
 * El métoddo debe recuperar el objeto teacher, objeto student y, opcionalmente,
 * el nombre del curso.  Tu tarea es encontrar la correspondencia entre el
 * estudiante y el profesor.
 * 
 * En caso de que no se proporcione el nombre del curso, el método debe devolver:
 * 
 *    + Una matriz vacía si no hay coincidencias (el profesor no imparte cursos en los
 *      que está interesado el estudiante o imparte cursos de un nivel inferior)
 *    + Una matriz con objetos {course, level}, si el profesor enseña los cursos que le
 *      interesan al estudiante.
 * 
 * Si el nombre del curso se pasa como último argumento, entonces el método debe devolver
 * el objeto {course, level} en caso de una coincidencia correcta o undefined en caso contrario.
 * 
 * Pruebe su solución utilizando el siguiente código:
 * 
 * 
 */


/*
let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 4);
teacher1.addCourse('maths', 4);
let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]
teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []
teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}
*/


// Clase User base para Student y Teacher
class User {
    constructor({ name, surname, email }) {
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.courses = []; // Inicializamos una lista de cursos
    }
  
    // Método para agregar cursos
    addCourse(course, level) {
      this.courses.push({ course, level });
    }
  
    // Método para obtener los cursos del usuario
    getCourses() {
      return this.courses;
    }
  }
  
  // Clase Student que extiende User
  class Student extends User {
    constructor(details) {
      super(details);
    }
  }
  
  // Clase Teacher que extiende User y tiene un método para editar cursos
  class Teacher extends User {
    constructor(details) {
      super(details);
    }
  
    // Método para editar el nivel de un curso
    editCourse(courseName, newLevel) {
      const course = this.courses.find(c => c.course === courseName);
      if (course) {
        course.level = newLevel;
      }
    }
  }
  
  // Clase ExtendedUser con el método estático match
  class ExtendedUser {
    static match(teacher, student, courseName = null) {
      // Obtenemos los cursos del estudiante y del profesor
      const studentCourses = student.getCourses();
      const teacherCourses = teacher.getCourses();
      
      // Si se especifica un curso específico
      if (courseName) {
        const studentCourse = studentCourses.find(c => c.course === courseName);
        const teacherCourse = teacherCourses.find(c => c.course === courseName);
  
        if (studentCourse && teacherCourse && teacherCourse.level >= studentCourse.level) {
          return { course: courseName, level: studentCourse.level };
        }
        return undefined;
      }
  
      // Si no se especifica un curso, buscamos todas las coincidencias
      const matches = studentCourses
        .filter(sc => {
          const teacherCourse = teacherCourses.find(tc => tc.course === sc.course);
          return teacherCourse && teacherCourse.level >= sc.level;
        })
        .map(sc => ({ course: sc.course, level: sc.level }));
  
      return matches;
    }
  }
  
  // Pruebas del código
  let student1 = new Student({ name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com' });
  let student2 = new Student({ name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com' });
  let teacher1 = new Teacher({ name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com' });
  
  student1.addCourse('maths', 2);
  student1.addCourse('physics', 4);
  teacher1.addCourse('maths', 4);
  
  let match = ExtendedUser.match(teacher1, student1);
  console.log(match); // -> [{ course: 'maths', level: 2 }]
  
  teacher1.editCourse('maths', 1);
  match = ExtendedUser.match(teacher1, student1);
  console.log(match); // -> []
  
  teacher1.addCourse('physics', 4);
  match = ExtendedUser.match(teacher1, student1, 'physics');
  console.log(match); // -> { course: 'physics', level: 4 }
  