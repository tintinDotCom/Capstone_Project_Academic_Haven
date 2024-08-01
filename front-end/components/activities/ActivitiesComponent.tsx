"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Assignments from "./Assignments";
import Quizzes from "./Quizzes";
import Exams from "./Exams";
import Buttons from "../Buttons/Button";
import { FaUpload } from "react-icons/fa";
import { GoUpload } from "react-icons/go";
import Modal from "../modals/Modal";
import UploadActivities from "./UploadActivities";
import { useRouter } from "next/navigation";
import { useStudentContext } from "@/app/contexts/StudentContext";

const ActivitiesComponent = () => {
  const { students } = useStudentContext();
  const router = useRouter();

  const handleClick = () => {
    router.push("/classes/activities/upload");
  };
  const sampleAssignments = [
    {
      id: 1,
      title: "Math Homework",
      description: "Complete the exercises on page 42.",
      dueDate: "2024-07-25",
      answered: students.length - 2,
      notAnswered: 2,
    },
    {
      id: 2,
      title: "Science Project",
      description: "Prepare a presentation on the solar system.",
      dueDate: "2024-08-01",
      answered: students.length - 5,
      notAnswered: 5,
    },
    {
      id: 3,
      title: "History Essay",
      description: "Write an essay about the Philippine Revolution.",
      dueDate: "2024-08-10",
      answered: students.length - 3,
      notAnswered: 3,
    },
  ];

  const sampleQuizzes = [
    {
      id: 1,
      title: "Math Quiz",
      description: "Complete the exercises on page 42.",
      dueDate: "2024-07-25",
      answered: students.length - 2,
      notAnswered: 2,
    },
    {
      id: 2,
      title: "Science Quiz",
      description: "Prepare a presentation on the solar system.",
      dueDate: "2024-08-01",
      answered: students.length - 5,
      notAnswered: 5,
    },
    {
      id: 3,
      title: "History Quiz",
      description: "Write an essay about the Philippine Revolution.",
      dueDate: "2024-08-10",
      answered: students.length - 3,
      notAnswered: 3,
    },
  ];

  const sampleExams = [
    {
      id: 1,
      title: "First Quarter Examination",
      description: "Complete the exercises on page 42.",
      dueDate: "2024-07-25",
      answered: students.length - 2,
      notAnswered: 2,
    },
    {
      id: 2,
      title: "Second Quarter Examination",
      description: "Prepare a presentation on the solar system.",
      dueDate: "2024-08-01",
      answered: students.length - 5,
      notAnswered: 5,
    },
    {
      id: 3,
      title: "Third Quarter Examination",
      description: "Write an essay about the Philippine Revolution.",
      dueDate: "2024-08-10",
      answered: students.length - 3,
      notAnswered: 3,
    },
  ];

  return (
    <div className="mt-6 w-full mr-2 2xl:w-[76%]">
      <div className="flex flex-row justify-between">
        <div></div>
        <div className="">
          <Buttons
            title="Post Activities"
            icon={<GoUpload size={16} />}
            onClick={handleClick}
          />
        </div>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" className="hover:bg-gray-300">
            All
          </TabsTrigger>
          <TabsTrigger value="assignments" className="hover:bg-gray-300">
            Assignments
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="hover:bg-gray-300">
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="exams" className="hover:bg-gray-300">
            Exams
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div>
            <Assignments assignments={sampleAssignments} />
            <Quizzes quizzes={sampleQuizzes} />
            <Exams exams={sampleExams} />
          </div>
        </TabsContent>
        <TabsContent value="assignments" className="w-full">
          <Assignments assignments={sampleAssignments} />
        </TabsContent>
        <TabsContent value="quizzes">
          <Quizzes quizzes={sampleQuizzes} />
        </TabsContent>
        <TabsContent value="exams">
          <Exams exams={sampleExams} />
        </TabsContent>
      </Tabs>

      {/* <Modal show={isOpen} onClose={closeModal}>
        <div>
          <UploadActivities />
        </div>
      </Modal> */}
    </div>
  );
};

export default ActivitiesComponent;
