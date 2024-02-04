using Microsoft.AspNetCore.Mvc;
using server.Controllers;
using System;
using System.Net;
using System.Numerics;
using System.Xml.Linq;
using static System.Net.Mime.MediaTypeNames;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        enum P { Math = 0, English, Angular };

        enum YEAR { First = 1, Second, Third };

        public static Proffetional[] PROFFETIONALS = {
             new Proffetional { id = (int)P.Math, name = (int)P.Math, description = "Math" },
             new Proffetional { id = (int)P.English, name = (int)P.English, description = "English" },
             new Proffetional { id = (int)P.Angular, name = (int)P.Angular, description = "Angular" }
        };

        public static List<Student> STUDENTS = new()
        {
            new Student{ id=0, tz= 3258, name= "Avi",            address= "Ami 9",     phone= "03-6192341", isActive= true,  average= 95.5, proffetional= PROFFETIONALS[(int)P.Angular],  year= (int)Year.First },
            new Student{ id=1, tz= 2433, name= "Yaakov",         address= "R Akiva 9", phone= "03-6192341", isActive= true,  average= 85.5, proffetional= PROFFETIONALS[(int)P.English],  year= (int)Year.Second },
            new Student{ id=2, tz= 3265, name= "Haim Cohen",     address= "Ami 9",     phone= "03-6192341", isActive= true,  average= 99,   proffetional= PROFFETIONALS[(int)P.Math],     year= (int)Year.Third },
            new Student{ id=3, tz= 433,  name="Yair Marom",      address= "Ami 9",     phone= "03-6192341", isActive= false, average= 100,  proffetional= PROFFETIONALS[(int)P.Angular],  year= (int)Year.Third ,   dateLeft= new DateTime(2023, 9, 20) },
            new Student{ id=4, tz= 5682, name= "Meir Ben David", address= "Ami 9",     phone= "03-6192341", isActive= false, average= 95.5, proffetional= PROFFETIONALS[(int)P.English],  year= (int)Year.First,    dateLeft= new DateTime(2023, 10, 1) }
        };



        // GET: api/<TasksController>
        [HttpGet]
        public ActionResult<IEnumerable<Student>> Get() => Ok(STUDENTS);

        // GET api/<TasksController>/5
        [HttpGet("active")]
        public ActionResult<IEnumerable<Student>> Get(bool isActive)
        {
            if (isActive)
                return Ok(STUDENTS.Where(s => s.isActive == true));
            return Ok(STUDENTS);
        }

        [HttpGet("name")]
        public ActionResult<IEnumerable<Student>> Get(string? name = "")
        {
            return Ok(name == null || name == "" ? STUDENTS :
                STUDENTS.Where(s => s.name.Equals(name, StringComparison.InvariantCultureIgnoreCase))
                );
        }

        // POST api/<TasksController>
        [HttpPost("add")]
        public ActionResult<bool> Post([FromBody] Student student)
        {
            var index = STUDENTS.FindIndex(s => s.id == student.id);
            if (index < 0)
            {
                STUDENTS.Add(student);
                return Ok(true);
            }
            STUDENTS.Find(s => s.id == student.id)?.CopyStudent(student);
            return Ok(false);
        }

        // PUT api/<TasksController>/5
        [HttpPut("{id}")]
        public ActionResult<Student> Put(int id, [FromBody] Student value)
        {
            Student? student = STUDENTS.Find(s => s.id == id);
            if (student != null)
            {
                student.CopyStudent(value);
                return Ok(student);
            }
            return BadRequest("student is null!");
        }

        // DELETE api/<TasksController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var student = STUDENTS.Find(s => s.id == id);
            if (student != null)
            {
                STUDENTS.Remove(student);
                if (!STUDENTS.Contains(student))
                    return Ok();
            }
            return BadRequest();
        }
    }
}
