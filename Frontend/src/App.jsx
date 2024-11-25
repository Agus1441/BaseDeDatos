import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/admin/home/Home'
import InstructorManagement from './components/admin/instructorManagement/InstructorManagement';
import ActivityManagement from './components/admin/activityManagement/ActivityManagement';
import StudentManagement from './components/admin/studentManagement/StudentManagement';
import ClassManagement from './components/admin/classManagement/ClassManagement';
import Login from './components/login/Login';
import RegisterAdmin from './components/register/Register';
import HomeStudent from './components/student/homeStudent/HomeStudent';
import InscriptionActivity from './components/student/inscriptionActivity/InscriptionActivity';
import RentEquipment from './components/student/rentEquipment/RentEquipment';
import Reports from './components/admin/Reports';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterAdmin />} />

          {/* Rutas protegidas para el administrador */}
          <Route
            path="/home"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activities"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <ActivityManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructors"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <InstructorManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <StudentManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/classes"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <ClassManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/homeStudent"
            element={
              <ProtectedRoute requiredRole="alumno">
                <HomeStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Inscripciones"
            element={
              <ProtectedRoute requiredRole="alumno">
                <InscriptionActivity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Alquilar"
            element={
              <ProtectedRoute requiredRole="alumno">
                <RentEquipment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
