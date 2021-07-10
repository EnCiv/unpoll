import React from 'react'

import { PageHeader } from '../app/components/page-header'

export default {
    title: 'PageHeader',
    component: PageHeader,
    argTypes: {},
}

const Template = (args) => <PageHeader {...args} />;

export const HeaderTest = Template.bind({});
HeaderTest.args = { majorLine: '', minorLine: '' };
