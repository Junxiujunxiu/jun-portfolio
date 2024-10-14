import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'contact',
  type: 'document',
  title: 'Contact',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'message',
      type: 'text',
      title: 'Message',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
