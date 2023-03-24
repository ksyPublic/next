"use client";
import axios from "axios";
interface PageProps {
  props: any;
}

const Page = ({ props }: PageProps) => {
  console.log("???", props);
  //home
  return <main className="ly-main" />;
};

export const getServerSideProps = async () => {
  const host = process.env.HOST;
  const data = await (await axios.get(`${host}/api/test`)).data;
  return {
    props: {
      datas: data,
    },
  };
};

export default Page;
