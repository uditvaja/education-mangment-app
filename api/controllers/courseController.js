const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    try {
      const { title, description, startDate, endDate, teacher } = req.body;
  
      if (!teacher) {
        return res.status(400).json({ message: "Teacher field is required." });
      }
  
      const newCourse = new Course({
        title,
        description,
        startDate,
        endDate,
        teacher
      });
  
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  exports.getCourseById = async (req, res) => {
    const { id } = req.params; // Get the course ID from the request parameters
  
    try {
      const course = await Course.findById(id).populate('teacher students');
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json(course); // Return the found course
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle server error
    }
  };
  
  
  exports.enrollStudents = async (req, res) => {
    const { students } = req.body; // Expecting an array of student IDs
    const { id } = req.params; // Course ID

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Add students to the course
        course.students.push(...students);
        await course.save();

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find().populate('teacher students');
  res.json(courses);
};
exports.getCoursebyid = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).populate('teacher students');
  res.json(course); 
   
}
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedCourse);
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);
  res.json({ message: 'Course deleted' });
};
