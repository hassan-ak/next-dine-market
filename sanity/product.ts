export const product =  {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { 
                source: "name",
                maxLength: 90,
            }
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    {title: "Female", value: "Female"},
                    {title: "Male", value: "Male"},
                    {title: "Kids", value: "Kids"}
                ],
            },
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    {title: "Sweater", value: "Sweater"},
                    {title: "Dress", value: "Dress"},
                    {title: "T Shirts", value: "T Shirts"},
                    {title: "Pants", value: "Pants"},
                    {title: "Jackets", value: "Jackets"}
                ],
            },
        },
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
        },    
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'array', 
            of: [{type: 'block'}]
        },
        {
            name: 'care',
            title: 'Care',
            type: 'array', 
            of: [{type: 'block'}]
        }
    ]
}
