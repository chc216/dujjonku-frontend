import styled from "styled-components";
import NavBar from "@/components/Nav/NavBar";
import TopNavBar from "@/components/Nav/TopNavBar";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fbf9f8;
  min-width: 0;
`;

const Content = styled.div`
  padding: 32px;
`;

function PageLayout({ title, children }) {
  return (
    <Layout>
      <NavBar />
      <Main>
        <TopNavBar title={title} />
        <Content>{children}</Content>
      </Main>
    </Layout>
  );
}

export default PageLayout;
