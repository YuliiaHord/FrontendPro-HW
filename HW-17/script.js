class Student{
    constructor(name, surname, yearOfBirth) {
        this.name = name;
        this.surname = surname;
        this.yearOfBirth = yearOfBirth;
        this.grades = [];
        this.attendancy = [];
        this.averageGrade = 0;
        this.averageAttedancy = 0;
    }
    get studentAge(){
        console.log(`${this.name + " " + this.surname} is ${new Date().getFullYear() - this.yearOfBirth}`);
    }
    get averageMark(){
        console.log(`${this.name + " " + this.surname}\'s average grade is ${this.averageGrade}`);
    }
    estimate(mark) {
        if((typeof mark === "number") && (mark >= 0 && mark <= 100)){
            this.grades.push(mark);
            this.calcAverageGrade();
        } else {
            console.log("Please, your grade should from 0 to 100");
        }
    }
    present(){
        if(this.attendancy.length < 25){
            this.attendancy.push(true);
            this.calcAverageAttendancy();
        } else {
            console.log("Your course is over. You can't be present anymore.")
        }
    }

    absent() {
        if(this.attendancy.length < 25){
            this.attendancy.push(false);
            this.calcAverageAttendancy();
        } else {
            console.log("Your course is over. You can't check in.")
        }
    }
    calcAverageGrade(){
        const sum = this.grades.reduce((acc, grade) =>{
            return acc + grade;
        },0)
        return this.averageGrade = sum / this.grades.length;
    }
   calcAverageAttendancy(){
        const sum = this.attendancy.reduce((acc, attendance) => {
            return acc + Number(attendance);
        },0)
        return this.averageAttedancy = sum / this.attendancy.length;
    }
    summary (){
        this.calcAverageGrade();
        this.calcAverageAttendancy();
        if(this.averageGrade >= 90 && this.averageAttedancy >= 0.9){
            console.log("Молодець!");
        } else if((this.averageGrade <= 90 && this.averageAttedancy>= 0.9) || (this.averageGrade >= 90 && this.averageAttedancy <= 0.9)){
            console.log("Добре, але можна краще");
        } else {
            console.log("Редиска!");
        }
    }
}

const student1 = new Student("Ivan", "Honcharenko", 1990);
student1.studentAge;
student1.estimate(90);
student1.estimate(91);
student1.estimate(92);
student1.estimate(93);
student1.estimate(94);
student1.estimate(99);
student1.estimate(95);
console.log(student1.grades);
student1.averageMark;
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
console.log(student1.attendancy);
student1.summary();

const student2 = new Student("Anna", "Hlinova", 2001);
student2.studentAge;
student2.estimate(10);
student2.estimate(4);
student2.estimate(5);
student2.estimate(2);
student2.estimate(4);
student2.estimate(5);
student2.estimate(100);
console.log(student2.grades);
student2.averageMark;
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
student2.absent();
console.log(student2.attendancy);
student2.summary();
