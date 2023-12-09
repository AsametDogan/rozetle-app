import {
  Admin,
  AllAssignment,
  Assignment,
  Badges,
  Categories,
  Home,
  KVKK,
  Login,
  NewAssign,
  NewBadge,
  NotFound,
} from "./pages";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminContainer } from "./components";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminContainer />}>
          <Route element={<Badges />} path="/admin/badges" exact />
          <Route element={<NewBadge />} path="/admin/new-badge" />
          <Route element={<AllAssignment />} path="/admin/assignments" />
          <Route element={<Categories />} path="/admin/categories" />
          <Route element={<NewAssign />} path="/admin/new-assign" />
        </Route>
        <Route element={<Login />} path={"/admin"} />
        <Route element={<Login />} path={"/admin/login"} />
        <Route element={<Home />} path="/*" />
        <Route element={<Assignment />} path="/assign/:id" />
        <Route element={<KVKK />} path="/privacy-policy" />
        <Route element={<NotFound />} path="/not-found" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
