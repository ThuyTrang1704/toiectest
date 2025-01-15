import React, { useEffect } from "react";
import { publicRoutes } from "./routes";
// import { RouterProvider } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import MainLayoutAdmin from "./lib/layouts/layouts.admin";
import Admin from "./routes/admin";
import CreateGame from "./routes/admin/creategame";
import MainLayoutUser from "./lib/layouts/layouts.user";
import User from "./routes/user";
import Mygames from "./routes/admin/mygames/indext";
import Login from "./routes/hompage/Login";
import Signup from "./routes/hompage/Signup";
import ForgotPassword from "./routes/hompage/ForgotPassword";
import ResetPassword from "./routes/hompage/Reset-Password.jsx";
import DialogLogin from "./routes/hompage/DialogLogin";
import Homepage from "./routes/hompage";
import Test from "./routes/test/Test";
import Update from "./routes/admin/mygames/updatequestion/Update";
import QuestionResult from "./routes/user/QuestionResult";
import ClassExame from "./routes/user/ClassExame";
import QuizApp from "./routes/user/QuizApp ";
import Helloword from "./routes/user/helloword";

import TestExam from "./routes/user/exam/testExam.jsx";

import CreateSkill from "./routes/admin/skill/createSkill";
import CreateLevel from "./routes/admin/level/createLevel";
import CreatePart from "./routes/admin/part/createPart";
import CreateQuestionManage from "./routes/admin/question/createQuestion1";
import CreateStructure from "./routes/admin/structure/createStructure";
import Addresult from "./routes/admin/result/addresult";
import CreateTopic from "./routes/admin/Topic/createTopic";
import Contact from "./routes/user/contact/contact.jsx";
import ExamPage from "./routes/user/exam/examPage.jsx";
import CreateOwnStructure from "./routes/user/exam/CreateStructure.jsx";
import Profile from "./routes/user/contact/profile.jsx";
import CreateUser from "./routes/admin/User/createUser.jsx";
import Dashboard from "./routes/admin/dashboard/dashboard.jsx";
import Calculate from "./routes/user/contact/Calculate.jsx";

import MainTest from "../src/routes/user/exam/mainTest.jsx";
import MainStart from "../src/routes/user/exam/mainStart.jsx";

import AddPart from "./routes/admin/part/addPart.jsx";
import AddTopic from "./routes/admin/Topic/addTopic.jsx";
import AddQuestion from "./routes/admin/question/addQuestion.jsx";
import Roleadmin from "./routes/admin/Roleadmin/createAdmin.jsx";
import Profileadmin from "./routes/admin/profileadmin/editadmin.jsx";

import FirstPage from "./routes/user/firstPage";
import { Editable } from "@chakra-ui/react";
import router from "./routes/route";
import PublicRoute from "./routes/route/PublicRoute.jsx";
import PrivateRoute from "./routes/route/PrivateRoute.jsx";

const App = () => {
  return (
    // <RouterProvider router={router}/>

    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Homepage />
          </PublicRoute>
        }
      >
        <Route
          path="/login"
          element={
            <PublicRoute>
              <DialogLogin>
                <Login />
              </DialogLogin>
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <DialogLogin>
              <Signup></Signup>
            </DialogLogin>
          }
        ></Route>
        <Route
          path="/ForgotPassword"
          element={
            <DialogLogin>
              <ForgotPassword></ForgotPassword>
            </DialogLogin>
          }
        ></Route>
        <Route
          path="/Reset-Password"
          element={
            <DialogLogin>
              <ResetPassword></ResetPassword>
            </DialogLogin>
          }
        ></Route>
      </Route>

      <Route path="/helloword" element={<Helloword></Helloword>}></Route>

      <Route
        path="/Role_Student"
        element={
          <MainLayoutUser>
            <User></User>
          </MainLayoutUser>
        }
      ></Route>
      <Route
        path="/contact"
        element={
          <MainLayoutUser>
            <Contact></Contact>
          </MainLayoutUser>
        }
      ></Route>
      <Route
        path="/ExamPage"
        element={
          <MainLayoutUser>
            <ExamPage></ExamPage>
          </MainLayoutUser>
        }
      ></Route>
      <Route
        path="/ExamPage/createStructure"
        element={
          <MainLayoutUser>
            <CreateOwnStructure></CreateOwnStructure>
          </MainLayoutUser>
        }
      ></Route>

      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["Role_Admin"]}>
            <MainLayoutAdmin>
              <Dashboard></Dashboard>
            </MainLayoutAdmin>
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/user"
        element={
          //<PrivateRoute allowedRoles={["Role_Admin"]}>
            <MainLayoutAdmin>
              <CreateUser></CreateUser>
            </MainLayoutAdmin>
          //</PrivateRoute>
        }
      ></Route>
      <Route
        path="/Roleadmin"
        element={
          <MainLayoutAdmin>
            <Roleadmin></Roleadmin>
          </MainLayoutAdmin>
        }
      ></Route>

      <Route
        path="/skill"
        element={
          //<PrivateRoute allowedRoles={["Role_Admin"]}>
          <MainLayoutAdmin>
            <CreateSkill></CreateSkill>
          </MainLayoutAdmin>
         // </PrivateRoute>
        }
      ></Route>
      <Route
        path="/part"
        element={
          //<PrivateRoute allowedRoles={["Role_Admin"]}>
          <MainLayoutAdmin>
            <CreatePart></CreatePart>
          </MainLayoutAdmin>
          //</PrivateRoute>
        }
      ></Route>
      <Route
        path="/part/addpart"
        element={
          //<PrivateRoute allowedRoles={["Role_Admin"]}>
          <MainLayoutAdmin>
            <AddPart></AddPart>
          </MainLayoutAdmin>
          //</PrivateRoute>
        }
      ></Route>
  

      <Route
        path="/level"
        element={
          //<PrivateRoute allowedRoles={["Role_Admin"]}>
          <MainLayoutAdmin>
            <CreateLevel></CreateLevel>
          </MainLayoutAdmin>
          //</PrivateRoute>
        }
      ></Route>
      <Route
        path="/structure"
        element={
          //<PrivateRoute allowedRoles={["Role_Admin"]}>
          <MainLayoutAdmin>
            <CreateStructure></CreateStructure>
          </MainLayoutAdmin>
          //</PrivateRoute>
        }
      ></Route>
      <Route
        path="/result"
        element={
          //<PrivateRoute allowedRoles={["Role_Admin"]}>
          <MainLayoutAdmin>
            <Addresult></Addresult>
          </MainLayoutAdmin>
          //</PrivateRoute>
        }
      ></Route>
      <Route
        path="/topic"
        element={
          //<PrivateRoute allowedRoles={["Role_Admin"]}>
          <MainLayoutAdmin>
            <CreateTopic></CreateTopic>
          </MainLayoutAdmin>
          //</PrivateRoute>
        }
      ></Route>
      <Route
        path="/topic/addtopic"
        element={
          //<PrivateRoute allowedRoles={["Role_Admin"]}>
          <MainLayoutAdmin>
            <AddTopic></AddTopic>
          </MainLayoutAdmin>
         //  </PrivateRoute>
        }
      ></Route>
      <Route
        path="/question"
        element={
          // <PrivateRoute allowedRoles={["Role_Admin"]}>
          <MainLayoutAdmin>
            <CreateQuestionManage></CreateQuestionManage>
          </MainLayoutAdmin>
          //</PrivateRoute>
        }
      ></Route>
      <Route

        path="/question/addquestion"
        element={
          //<PrivateRoute allowedRoles={["Role_Admin"]}>
          <MainLayoutAdmin>
            <AddQuestion></AddQuestion>
          </MainLayoutAdmin>
          //</PrivateRoute>
        }
      ></Route>

      <Route
        path="/Role_Lecturer-CreateGame"
        element={
          <MainLayoutAdmin>
            <CreateGame></CreateGame>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/MyGame"
        element={
          <MainLayoutAdmin>
            <Mygames></Mygames>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/create-question"
        element={
          <MainLayoutAdmin>
            <Update></Update>
          </MainLayoutAdmin>
        }
      ></Route>

      <Route path="/testExam/:id" element={<TestExam></TestExam>}></Route>

      <Route path="/mainTest/:id" element={<MainTest></MainTest>}></Route>

      <Route path="/mainStart/" element={<MainStart></MainStart>}></Route>

      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route
        path="/calculate"
        element={
          <MainLayoutUser>
            <Calculate></Calculate>
          </MainLayoutUser>
        }
      ></Route>

      <Route
        path="/Role_Student_QuestionDetailResult"
        element={<QuestionResult>Lecture</QuestionResult>}
      ></Route>
      <Route
        path="Role_Student_Class"
        element={<ClassExame></ClassExame>}
      ></Route>
      <Route
        path="/Role_Student_QuestionDetailResult"
        element={<QuestionResult>Lecture</QuestionResult>}
      ></Route>
      <Route path="/test" element={<QuizApp></QuizApp>}></Route>
      <Route path="/lecture" element={<div>Lecture</div>}></Route>
    </Routes>
  );
};

export default App;
