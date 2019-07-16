import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './sectionGroupList.scss';

interface Props {
  list: {
    title: string;
    desc: string;
    fid: number;
  }[];
}

class SectionGroupList extends Taro.Component<Props, {}> {
  public static defaultProps = {
    list: [
      {
        title: '',
        desc: '',
        fid: 0
      }
    ]
  };

  private toSectionThreadList(fid: number, title: string): void {
    Taro.navigateTo({
      url: `/pages/section/sectionThreadList?fid=${fid}&title=${title}`
    });
  }

  public render(): JSX.Element {
    const { list } = this.props;
    const sections = list.map(
      (item): JSX.Element => {
        return (
          <View
            key={item.fid}
            onClick={this.toSectionThreadList.bind(this, item.fid, item.title)}
          >
            <View className="section at-row at-row__align--center">
              <View className="icon">
                <Image
                  mode="aspectFill"
                  src={`./assets/f${item.fid}.png`}
                ></Image>
              </View>
              <View className="info at-row">
                <Text className="title">{item.title}</Text>
                <Text className="desc">{item.desc}</Text>
              </View>
            </View>
          </View>
        );
      }
    );
    return <View>{sections}</View>;
  }
}

export default SectionGroupList as Taro.ComponentClass<Props>;
