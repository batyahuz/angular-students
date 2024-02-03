using server.Controllers;

namespace WebApplication1
{
    public enum Year { First = 1, Second, Third }
    public class Student
    {
        public int id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public bool isActive { get; set; }
        public double average { get; set; }
        public DateTime dateLeft { get; set; }
        public Proffetional proffetional { get; set; }
        public int year { get; set; }
        public void CopyStudent(Student student)
        {
            this.name = student.name;
            this.address = student.address;
            this.phone = student.phone;
            this.isActive = student.isActive;
            this.average = student.average;
            this.dateLeft = student.dateLeft;
            this.proffetional = student.proffetional;
        }
    }
}
