import { shallow } from 'enzyme'
import Index from './index'

const setup = overrides => {
  const defaultProps = {
    candaddyplay: 'yes'
  }

  const props = { ...defaultProps, ...overrides }
  const wrapper = shallow(<Index { ...props } />)

  return { props, wrapper }
}

describe('Index', () => {
  test('should render', () => {
    const { wrapper } = setup()
    expect(wrapper.exists()).toBe(true)
  });

  test('should default `state.candaddyplay` to yes', () => {
    const { wrapper } = setup()
    expect(wrapper.state('candaddyplay')).toEqual('yes')
  });

  test('should set a classname based on state of `yes`', () => {
    const { wrapper } = setup()
    expect(wrapper.find('.wrapper--yes').exists()).toBe(true)
    expect(wrapper.find('.wrapper--no').exists()).toBe(false)
  });

  test('should set a classname based on state of `no`', () => {
    const { wrapper } = setup({ candaddyplay: 'no' })
    expect(wrapper.find('.wrapper--no').exists()).toBe(true)
    expect(wrapper.find('.wrapper--yes').exists()).toBe(false)
  });
});