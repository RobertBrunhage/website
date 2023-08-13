import {
  mysqlTable,
  int,
  varchar,
  unique,
  index,
  boolean,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: int("id").primaryKey().autoincrement().notNull(),
  sub: varchar("sub", { length: 256 }).unique("user_sub_key").notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 256 })
    .unique("user_stripe_customer_id_key")
    .notNull(),
});

export const course = mysqlTable("course", {
  id: int("id").primaryKey().autoincrement().notNull(),
  name: varchar("name", { length: 256 }).unique("course_name_key").notNull(),
  stripeProductId: varchar("stripe_product_id", { length: 256 })
    .unique("course_stripe_product_id_key")
    .notNull(),
});

export const userCourses = mysqlTable(
  "user_courses",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    courseId: int("courseId").notNull(),
    userId: int("userId"),
  },
  (table) => {
    return {
      courseIdUserId: unique("course_id_user_id_key").on(
        table.courseId,
        table.userId,
      ),
    };
  },
);

export const lecture = mysqlTable(
  "lecture",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    name: varchar("name", { length: 256 }).unique("lecture_name_key").notNull(),
    courseId: int("course_id").notNull(),
  },
  (table) => {
    return {
      courseIdIdx: index("lecture_course_id_idx").on(table.courseId),
    };
  },
);

export const lectureUserInfo = mysqlTable(
  "lecture_user_info",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    sub: varchar("sub", { length: 256 }).notNull(),
    lectureId: int("lecture_id").notNull(),
    seen: boolean("seen").default(false).notNull(),
  },
  (table) => {
    return {
      subIdx: index("lecture_user_info_sub_idx").on(table.sub),
      lectureIdIdx: index("lecture_user_info_lecture_id_idx").on(
        table.lectureId,
      ),
      lectureUserInfoSubLectureIdKey: unique(
        "lecture_user_info_sub_lecture_id_key",
      ).on(table.sub, table.lectureId),
    };
  },
);
