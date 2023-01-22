import { gql } from "@apollo/client";

export const GET_ENROLLMENTS = gql`
  query GetEnrollments {
    enrollments: studentAdmin_enrollments(order_by: { student_id: asc }) {
      id
      course_id
      student_id
      grade
      student {
        firstname
        lastname
      }
      course {
        title
      }
    }
  }
`;

export const GET_ENROLLMENT = gql`
  query GetEnrollment($id: Int!) {
    enrollment: studentAdmin_enrollments_by_pk(id: $id) {
      id
      course_id
      student_id
      grade
      student {
        firstname
        lastname
      }
      course {
        title
      }
    }
    courses: studentAdmin_courses {
      label: title
      value: id
    }
    students: studentAdmin_students {
      label: lastname
      value: id
    }
  }
`;

export const UPDATE_ENROLLMENT = gql`
  mutation UpdateEnrollment(
    $id: Int!, 
    $student_id: Int!, 
    $course_id: Int!,
    $grade: String!
    ) {
    update_studentAdmin_enrollments_by_pk(
      pk_columns: { id: $id }
      _set: { student_id: $student_id, course_id: $course_id, grade: $grade }
    ) {
      id
    }
  }
`;

export const DELETE_ENROLLMENT = gql`
  mutation DeleteEnrollment($id: Int!) {
    delete_studentAdmin_enrollments_by_pk(id: $id) {
      id
    }
  }
`;

export const INSERT_ENROLLMENT = gql`
  mutation InsertEnrollment(
    $student_id: Int!, 
    $course_id: Int!,
    $grade: String!
    ) {
    insert_studentAdmin_enrollments(
      objects: [{ student_id: $student_id, course_id: $course_id, grade: $grade }]
    ) {
      returning {
        id
      }
    }
  }
`;
