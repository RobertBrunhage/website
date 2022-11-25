import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";

const ModulePage = () => {
  const router = useRouter();
  const { module } = router.query;

  console.log(module && module);

  return (
    <Layout>
      <div className="max_width">
        <h1>{module && module[1]}</h1>
      </div>
    </Layout>
  );
};

export default ModulePage;
