import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import { AiFillDelete } from "react-icons/ai";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPlus } from "react-icons/fa";
import {
  clearError,
  clearMessages,
  getSubjects,
  deleteSubjects,
  addSubjects,
} from "../../redux/subjectSlice";
import { useSelector, useDispatch } from "react-redux";
import { createClass } from "../../redux/classesSlice";

const CreateClass = () => {
  const dispatch = useDispatch();
  const { error, message, loading, subjects } = useSelector(
    (state) => state.subjects
  );
  const [newSubject, setNewSubject] = useState("");
  const [newVocationalSubject, setNewVocationalSubject] = useState("");

  useEffect(() => {
    dispatch(getSubjects());
    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
    if (message) {
      const messageInterval = setInterval(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch, error, message]);

  const initialValues = {
    class_name: "",
    class_section: "",
    ...subjects?.reduce((acc, subject) => {
      acc[subject] = false;
      return acc;
    }, {}),
  };

  const validationSchema = Yup.object().shape({
    class_name: Yup.string().required("Class Name is required"),
    class_section: Yup.string()
      .required("Section is required")
      .min(1, "Section is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      subjects.forEach((subject) => {
        values[subject] = values[subject] ? "yes" : "no";
      });
    },
  });

  const AddVocationalsubjectSubmit = async () => {
    try {
      if (!subjects.includes(newVocationalSubject)) {
        dispatch(addSubjects({ newVocationalSubject, action: "voc" }));
      }
    } catch (error) {
      console.error("Error submitting new subject:", error);
    }
  };

  const AddsubjectSubmit = async () => {
    try {
      if (!subjects.includes(newSubject)) {
        dispatch(addSubjects({ newSubject, action: "nonvoc" }));
      }
    } catch (error) {
      console.error("Error submitting new subject:", error);
    }
  };

  const handleDelSubjectSubmit = async () => {
    try {
      const allkeys = Object.keys(formik.values);
      const delSubjects = allkeys.slice(2);
      dispatch(deleteSubjects(delSubjects));
    } catch (error) {
      console.error("Error deleteing subject:", error);
    }
  };
  console.log(subjects);
  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-1 mb-1">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          Create Class Form
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
          <FaAngleDown
            className="text-yellow-700 cursor-pointer"
            // onClick={checkAlert}
          />
          <FaArrowsRotate
          // className={`text-green-700 cursor-pointer ${
          // rotate
          // ? "rotate-180 transition-transform duration-1000"
          // : "transition-transform"
          // }`}
          // onClick={handleRefresh}
          />
          <FaXmark className="text-red-700 cursor-pointer" />
        </div>
      </div>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div
        className={`flex bg-white justify-center ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full  px-4 mx-auto mt-10 bg-white">
            <div className="flex-auto px-4 py-1 pt-0">
              <form className="py-1" onSubmit={formik.handleSubmit}>
                <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                  Class Information
                  <div className="h-1 bg-gray-700 w-16 my-3"></div>
                </h6>
                <div className="flex flex-wrap mb-5">
                  <div className="w-3/4 flex">
                    <div className="w-1/2 px-2">
                      <div className=" w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                          htmlFor="class_name"
                        >
                          Class
                        </label>
                        <select
                          id="class_name"
                          type="text"
                          value={formik.values.class_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                            formik.touched.class_name &&
                            formik.errors.class_name
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <option value="">Choose a Class</option>
                          <option value="prenursery_15">Pre Nursery</option>
                          <option value="nursery_14">Nursery</option>
                          <option value="kg_13">KG</option>
                          <option value="first_1">1</option>
                          <option value="second_2">2</option>
                          <option value="third_3">3</option>
                          <option value="fourth_4">4</option>
                          <option value="fifth_5">5</option>
                          <option value="sixth_6">6</option>
                          <option value="seventh_7">7</option>
                          <option value="eighth_8">8</option>
                          <option value="ninth_9">9</option>
                          <option value="ten_10">10</option>
                          <option value="eleven_11">11</option>
                          <option value="twelth_12">12</option>
                        </select>
                      </div>
                      {formik.touched.class_name &&
                        formik.errors.class_name && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.class_name}
                          </p>
                        )}
                    </div>

                    <div className="w-1/2 px-2">
                      <div className="relative w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                          htmlFor="class_section"
                        >
                          section
                        </label>
                        <select
                          id="class_section"
                          type="text"
                          value={formik.values.class_section}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                            formik.touched.class_section &&
                            formik.errors.class_section
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <option value="">Choose a section</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                        </select>
                      </div>
                      {formik.touched.class_section &&
                        formik.errors.class_section && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.class_section}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="pt-6 px-12">
                    <button
                      type="button"
                      onClick={handleDelSubjectSubmit}
                      className=" text-red-700 text-2xl "
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300 py-1" />
                <div className="flex justify-between">
                  <div className="w-1/2 ">
                    <div className="flex justify-between">
                      <div>
                        <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                          Select Subject
                          <div className="h-1 bg-gray-700 w-16 my-3"></div>
                        </h6>
                      </div>
                      <div>
                        <input
                          type="text"
                          id="new_subject"
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          className="border-0  py-1 mt-3 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 "
                        />
                      </div>
                      <div className="py-4 pr-12">
                        <FaPlus onClick={AddsubjectSubmit} />
                      </div>
                    </div>
                    <div className="flex flex-wrap border-r-2  border-gray-900 pt-5">
                      {subjects
                        ?.filter(
                          (subject) =>
                            !subject.toLowerCase().startsWith("vocational")
                        )
                        .map((subject) => (
                          <div key={subject} className="w-full lg:w-3/12 px-4">
                            <div className=" w-full mb-3 flex justify-between items-center">
                              <label
                                className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor={subject}
                              >
                                {subject}
                              </label>
                              <input
                                type="checkbox"
                                id={subject}
                                checked={formik.values[subject]}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    subject,
                                    e.target.checked
                                  )
                                }
                                onBlur={formik.handleBlur}
                                className={`shadow-md rounded-lg  ${
                                  formik.touched[subject] &&
                                  formik.errors[subject]
                                    ? "border-red-500"
                                    : ""
                                }`}
                              />
                            </div>
                            {formik.touched[subject] &&
                              formik.errors[subject] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {formik.errors[subject]}
                                </p>
                              )}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="w-1/2 ">
                    <div className="flex justify-between">
                      <div>
                        <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                          Select Vocational Subject
                          <div className="h-1 bg-gray-700 w-16 my-3"></div>
                        </h6>
                      </div>
                      <div>
                        <input
                          type="text"
                          id="new_vocational_subject"
                          value={newVocationalSubject}
                          onChange={(e) =>
                            setNewVocationalSubject(e.target.value)
                          }
                          className="border-0  py-1 mt-3 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 "
                        />
                      </div>
                      <div className="py-4 pr-12">
                        <FaPlus onClick={AddVocationalsubjectSubmit} />
                      </div>
                    </div>
                    <div className="flex flex-wrap border-r-2  border-gray-900 pt-5">
                      {subjects
                        ?.filter((subject) =>
                          subject.toLowerCase().startsWith("vocational")
                        )
                        .map((subject) => (
                          <div key={subject} className="w-full lg:w-6/12 px-4">
                            <div className=" w-full mb-3 flex justify-between items-center">
                              <label
                                className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor={subject}
                              >
                                {subject}
                              </label>
                              <input
                                type="checkbox"
                                id={subject}
                                checked={formik.values[subject]}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    subject,
                                    e.target.checked
                                  )
                                }
                                onBlur={formik.handleBlur}
                                className={`shadow-md rounded-lg  ${
                                  formik.touched[subject] &&
                                  formik.errors[subject]
                                    ? "border-red-500"
                                    : ""
                                }`}
                              />
                            </div>
                            {formik.touched[subject] &&
                              formik.errors[subject] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {formik.errors[subject]}
                                </p>
                              )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300 py-1" />
                <div className="mx-3 flex justify-start">
                  <button
                    className="bg-amber-500 text-white active:bg-yellow-700 font-bold uppercase text-xs px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-xs px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    onClick={formik.resetForm}
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateClass;