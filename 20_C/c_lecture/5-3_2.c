#include <stdio.h>

main()
{
	int score;
	int good = 0, nomal = 0, bad = 0, people = 0;

	while (1) {
		printf("만족도를 선택하십시오 (1: 아주만족 ~ 5: 아주불만) : ");
		scanf_s("%d", &score);
		if (score < 1 || score > 5) {
			printf("1, 2, 3, 4, 5 중 하나의 숫자만 입력하십시오.\n\n");
		}
		else {
			switch (score)
			{
			case 1: case 2:
				people += 1;
				printf("만족에 한표 추가합니다. : 총 %d 표\n", ++good);
				printf("현재까지의 투표결과는 참석자 총 %d 명중에서\n", people);
				break;
			case 3:
				people += 1;
				printf("보통에 한표 추가합니다. : 총 %d 표\n", ++nomal);
				printf("현재까지의 투표결과는 참석자 총 %d 명중에서\n", people);
				break;
			case 4: case 5:
				people += 1;
				printf("불만에 한표 추가합니다. : 총 %d 표\n", ++bad);
				printf("현재까지의 투표결과는 참석자 총 %d 명중에서\n", people);
				break;
			default:
				printf("1, 2, 3, 4, 5 중 하나의 숫자만 입력하십시오 : 입력값(%d)\n\n", score);
			}
			printf("만족 : %d 명 보통 : %d 명 불만 %d 명 입니다.\n\n", good, nomal, bad);
		}
		rewind(stdin);
	}
}