"use client";

import React, { useState } from "react";
import { useStudentContext } from "@/app/contexts/StudentContext";
import AdminLayout from "@/components/layout/AdminLayout";
import { FaUserAltSlash, FaUserEdit } from "react-icons/fa";
import SearchBar from "@/components/searchbar/SearchBar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const StudentsPage: React.FC = () => {
  const { students, deleteStudent, addStudent } = useStudentContext();
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    grade: "",
    profilePicture: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setIsEditing(true);
  };

  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      deleteStudent(id);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCloseAdd = () => {
    setNewStudent({
      id: 0,
      name: "",
      email: "",
      password: "",
      grade: "",
      profilePicture: "",
      status: "Active",
    });
    setIsAdding(false);
  };

  const handleCloseEdit = () => {
    setEditingStudent(null);
    setIsEditing(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement the function to update the student information
    // e.g., updateStudent(editingStudent.id, editingStudent);
    handleCloseEdit();
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent(newStudent);
    handleCloseAdd();
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Students</h1>

        <div className="w-full h-20">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        </div>
        <div>
          <button
            onClick={handleAdd}
            className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded mb-4"
          >
            Add Student
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-b border-gray-200 rounded-lg">
            <thead className="text-left">
              <tr>
                <th className="py-2 px-4 border-b text-xs md:text-base">ID</th>
                <th className="py-2 px-4 border-b text-xs md:text-base">
                  Name
                </th>
                <th className="py-2 px-4 border-b hidden md:table-cell">
                  Email
                </th>
                <th className="py-2 px-4 border-b text-xs md:text-base">
                  Status
                </th>
                <th className="py-2 px-4 border-b text-xs md:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id}>
                  <td className="py-2 px-4 border-b hidden md:table-cell">
                    {student.id}
                  </td>
                  <td className="py-2 px-4 border-b flex items-center gap-4">
                    <img
                      src={student.profilePicture}
                      alt={student.name}
                      className="w-[30px] h-[30px] rounded-full"
                    />
                    <span className="text-xs md:text-base">{student.name}</span>
                  </td>
                  <td className="py-2 px-4 border-b hidden md:table-cell">
                    {student.email}
                  </td>
                  <td className="py-2 px-4 border-b text-xs md:text-base">
                    {student.status}
                  </td>
                  <td className="py-2 px-4 border-b text-xs md:text-base">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-blue-500 hover:underline"
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-red-500 hover:underline ml-4"
                    >
                      <FaUserAltSlash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isEditing && editingStudent && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Edit Student</h2>
              <form onSubmit={handleSubmitEdit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    value={editingStudent.name}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        name: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editingStudent.email}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        email: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Status</label>
                  <input
                    type="text"
                    value={editingStudent.status}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        status: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        {isAdding && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Add New Student</h2>
              <form onSubmit={handleSubmitAdd}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        name: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, email: e.target.value })
                    }
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Profile Picture URL
                  </label>
                  <input
                    type="text"
                    value={newStudent.profilePicture}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        profilePicture: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={handleCloseAdd}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="fixed bottom-14 md:bottom-10">
          <Pagination className="text-xs">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    isActive={index + 1 === currentPage}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StudentsPage;
