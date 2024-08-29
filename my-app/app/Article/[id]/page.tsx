

import { DetailArticle } from "@/components/article/DetailArticle";
import { Box } from "@mui/material";


interface IParams {
  params: { id: number };
}

export default function ArticlePage({ params }: IParams) {
  debugger
  return (
    <Box
      mt={{ xs: 2, md: 4 }}
      paddingX={{
        xs: "14px",
        md: "120px",
      }}
    >
      <DetailArticle index={params.id} />
    </Box>
  );
}