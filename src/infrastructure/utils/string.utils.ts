import { CommonConstants } from '../constants/common.constants';

export class StringUtil {
  public static parseAuthHeader(hdrValue) {
    if (typeof hdrValue !== 'string') {
      return null;
    }
    const matches = hdrValue.match(CommonConstants.AUTHORIZATION_HEADER_REGEX);
    return matches && { scheme: matches[1], value: matches[2] };
  }

  public static filterKeyword(keyword: string) {
    if (!keyword) {
      return CommonConstants.PERCENT_SIGN;
    }
    const searchKeyword = `${CommonConstants.PERCENT_SIGN}${keyword.trim()}${
      CommonConstants.PERCENT_SIGN
    }`;
    return searchKeyword
      .split(CommonConstants.UNDERSCORE)
      .join(CommonConstants.UNDERSCORE_ESCAPE);
  }
}
