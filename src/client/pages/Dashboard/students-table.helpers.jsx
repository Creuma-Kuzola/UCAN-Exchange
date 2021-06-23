import React from 'react'

export const StudentsTableOptions = {
  filter: true,
  filterType: 'multiselect',
  responsive: 'vertical',
  elevation: 0,
  searchPlaceholder: 'Pesquisar',
  selectableRows: 'single',
  textLabels: {
    viewColumns: {
      title: 'view colunas',
    },
    toolbar: {
      downloadCsv: 'Exportar em Excel',
      print: 'Imprimir',
      search: 'Pesquisar dados',
      viewColumns: 'Colunas visíveis',
      filterTable: 'Filtros',
    },
    body: {
      noMatch: 'Nenhum resultado encontrado!',
      toolTip: 'Clique para ordenar',
    },
    pagination: {
      next: 'Próximo',
      previous: 'Anterior',
      displayRows: ' linhas de ',
      jumpToPage: 'Ir para',
      rowsPerPage: 'Linhas por página:',
    },
    filter: {
      all: 'Tudo',
      title: 'FILTRAR',
      reset: 'Limpar filtros',
    },
    selectedRows: {
      text: 'selecionado(s)',
      delete: 'Eliminar linha',
      deleteAria: 'As linhas selecionadas foram eliminadas',
    },
  },
  downloadOptions: { filename: 'lista-de-estudantes.csv', separator: ' | ' },
};


const CustomLabel = ({ children }) => (
  <p style={{ fontSize: 16, fontWeight: "bold" }}>
    {children}
  </p>
);
const CustomBody = ({ children }) => <p style={{ fontSize: 16 }}>{children}</p>;

export const StudentsTableColumns = [
  {
    name: "id",
    options: {
      customHeadLabelRender: () => <CustomLabel>ID</CustomLabel>,
      customBodyRender: value => <CustomBody>{value}</CustomBody>,
    },
  },
  {
    name: "nome",
    options: {
      customHeadLabelRender: () => <CustomLabel>Nome</CustomLabel>,
      customBodyRender: value => <CustomBody>{value}</CustomBody>,
    },
  },
  {
    name: "token1",
    options: {
      customHeadLabelRender: () => <CustomLabel>UCAN1</CustomLabel>,
      customBodyRender: value => <CustomBody>{value}</CustomBody>,
    },
  }, {
    name: "token2",
    options: {
      customHeadLabelRender: () => <CustomLabel>UCAN2</CustomLabel>,
      customBodyRender: value => <CustomBody>{value}</CustomBody>,
    },
  }, {
    name: "token3",
    options: {
      customHeadLabelRender: () => <CustomLabel>UCAN3</CustomLabel>,
      customBodyRender: value => <CustomBody>{value}</CustomBody>,
    },
  },
  {
    name: "patrimonio",
    options: {
      customHeadLabelRender: () => <CustomLabel>Patrimônio</CustomLabel>,
      customBodyRender: value => <CustomBody>{value}</CustomBody>,
    },
  },
  {
    name: "nota",
    options: {
      customHeadLabelRender: () => <CustomLabel>Nota</CustomLabel>,
      customBodyRender: value => <CustomBody>{value}</CustomBody>,
    },
  },
];

