import React from 'react'

import { PageHeader } from '../app/components/page-header'

export default {
    title: 'PageHeader',
    component: PageHeader,
    argTypes: {},
}

const Template = (args) => <PageHeader {...args} />;

const input = {
    majorLine = '',
    minorLine = '',
}

export const PageHeaderTest = Tempalte.bind({});
PageHeaderTest.args = {};
