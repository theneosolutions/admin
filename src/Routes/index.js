import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { routes } from "./routes";
import Profile from "Pages/Profile";
import TestPage from "Pages/TestPage/test2";
import Applications from "Pages/Applications";
import UserDetail from "Pages/UserDetail";
import MyAccount from "Pages/MyAccount";
import Login from "Pages/authentication/Login";
import Otp from "Pages/authentication/otp";
import ReactFlow from "../Pages/ReactFlow";
import UserAnswer from "../Pages/Users/user-answers";
import CreateScreens from "../Pages/Decision/createScreens";
import CreateLaonTax from "Pages/LOS/CreateTypeTax";
import ViewScreen from "Pages/Decision/ViewScreens";
import UserLoanApplications from "Pages/LOS/userLoanApplication";
import CreateNotification from "Pages/Notifications/addNotification/createNotification";
import UserProfile from "Pages/Users/userProfile";
import AddNewProduct from "Pages/LOS/installments/addNewProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/user-detail" element={<UserDetail />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/user-answers" element={<UserAnswer />} />
          <Route path="/create-screen" element={<CreateScreens />} />
          <Route path="/los/create-loan-tax" element={<CreateLaonTax />} />
          <Route path="/view-screen" element={<ViewScreen />} />
          <Route path="/user-applications" element={<UserLoanApplications />} />
          <Route
            path="/create-notifications"
            element={<CreateNotification />}
          />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/add-Product" element={<AddNewProduct />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/apitree" element={<ReactFlow />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
