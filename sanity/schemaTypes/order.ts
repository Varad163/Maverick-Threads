export default {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "userId",
      type: "string",
      title: "User ID",
    },
    {
      name: "items",
      type: "array",
      title: "Items",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "name", type: "string" },
            { name: "price", type: "number" },
            { name: "quantity", type: "number" },
            {
              name: "image",
              type: "image",
            },
          ],
        },
      ],
    },
    {
      name: "total",
      type: "number",
      title: "Total Price",
    },
    {
      name: "createdAt",
      type: "datetime",
      title: "Created At",
      initialValue: new Date().toISOString(),
    },
  ],
};
