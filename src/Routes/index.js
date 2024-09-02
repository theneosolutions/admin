import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { routes } from "./routes";
import Profile from "Pages/Profile";
import Applications from "Pages/Applications/Layout";
import MyAccount from "Pages/MyAccount";
import Login from "Pages/authentication/Login";
import ForgetPassword from "Pages/authentication/resetpassword";
import UserAnswer from "../Pages/Users/user-answers";
import CreateScreens from "../Pages/Decision/createScreens";
import CreateLaonTax from "Pages/LOS/CreateTypeTax";
import ViewScreen from "Pages/Decision/ViewScreens";
import UserLoanApplications from "Pages/LOS/userLoanApplication";
import CreateNotification from "Pages/Notifications/addNotification/createNotification";
import CreateNotificationTest from "Pages/Notifications/addNotification/testCreateNotification";
import UserProfile from "Pages/Users/userProfile";
import AddNewProduct from "Pages/LOS/installments/addNewProduct";
import AddSms from "Pages/Notifications/sms/addSms";
import MainTemplate from "Layouts/MainTemplate";
import NotFound from "Pages/NotFound";
import UserSimah from "Pages/Simah/simahDownlaod";
import UserEligibility from "Pages/userEligibility";
import FinanceAmountCalculations from "Pages/financeAmountCalculations";
import ViewPolicyHistory from "Pages/Policies/viewPolicies/viewPolicyHistory";
///kkkk
function App() {
  return (
    <MainTemplate>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes}
            <Route
              path="/customers/allcustomers/profile"
              element={<Profile />}
            />
            <Route path="/customers/verified/profile" element={<Profile />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/user-answers" element={<UserAnswer />} />
            <Route
              path="/decisions/create-set/create-screen"
              element={<CreateScreens />}
            />
            <Route path="/los/create-loan-tax" element={<CreateLaonTax />} />
            <Route
              path="/decisions/create-set/view-screen"
              element={<ViewScreen />}
            />
            <Route path="/404" element={<NotFound />} />
            <Route
              path="/customers/verified/simah/usercodes"
              element={<UserSimah />}
            />
            <Route path="/user-eligibility" element={<UserEligibility />} />
            <Route
              path="/finance-amount-calculations"
              element={<FinanceAmountCalculations />}
            />
            <Route
              path="/policies/view-policies/view-policy-history"
              element={<ViewPolicyHistory />}
            />

            <Route
              path="/user-applications"
              element={<UserLoanApplications />}
            />
            <Route
              path="/response/notifications/create-notifications"
              element={<CreateNotification />}
            />
            <Route
              path="/create-notifications-test"
              element={<CreateNotificationTest />}
            />
            <Route
              path="/applications/loan/user-profile"
              element={<UserProfile />}
            />
            <Route path="/add-Product" element={<AddNewProduct />} />
            <Route path="/add-sms" element={<AddSms />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </MainTemplate>
  );
}

export default App;
