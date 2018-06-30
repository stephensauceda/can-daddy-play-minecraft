import { shallow } from 'enzyme'
import Index from './index'

describe('Index', () => {
  test('should render', () => {
    const wrapper = shallow(<Index />)
    expect(wrapper.exists()).toBe(true)
  });
});