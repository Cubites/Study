#include <stdio.h>

main()
{
	int score;
	int good = 0, nomal = 0, bad = 0, people = 0;

	while (1) {
		printf("�������� �����Ͻʽÿ� (1: ���ָ��� ~ 5: ���ֺҸ�) : ");
		scanf_s("%d", &score);
		if (score < 1 || score > 5) {
			printf("1, 2, 3, 4, 5 �� �ϳ��� ���ڸ� �Է��Ͻʽÿ�.\n\n");
		}
		else {
			switch (score)
			{
			case 1: case 2:
				people += 1;
				printf("������ ��ǥ �߰��մϴ�. : �� %d ǥ\n", ++good);
				printf("��������� ��ǥ����� ������ �� %d ���߿���\n", people);
				break;
			case 3:
				people += 1;
				printf("���뿡 ��ǥ �߰��մϴ�. : �� %d ǥ\n", ++nomal);
				printf("��������� ��ǥ����� ������ �� %d ���߿���\n", people);
				break;
			case 4: case 5:
				people += 1;
				printf("�Ҹ��� ��ǥ �߰��մϴ�. : �� %d ǥ\n", ++bad);
				printf("��������� ��ǥ����� ������ �� %d ���߿���\n", people);
				break;
			default:
				printf("1, 2, 3, 4, 5 �� �ϳ��� ���ڸ� �Է��Ͻʽÿ� : �Է°�(%d)\n\n", score);
			}
			printf("���� : %d �� ���� : %d �� �Ҹ� %d �� �Դϴ�.\n\n", good, nomal, bad);
		}
		rewind(stdin);
	}
}